# frozen_string_literal: true

module Stopover
  module PaymentsManagement
    class CheckoutCreator
      def initialize(booking, payment_type)
        @booking = booking
        @payment_type = payment_type
      end

      def perform
        service = Stopover::StripeCheckoutService.new(nil, @booking, @payment_type)

        if @payment_type == 'deposit' && @booking.left_to_pay_deposit_price.zero?
          @booking.update(payment_type: 'cash')
          return {
            url: nil,
            booking: @booking,
            payment: nil,
            notification: I18n.t('graphql.mutations.create_checkout.notifications.success')
          }
        end

        if @payment_type == 'full_amount' && @booking.left_to_pay_price.zero?
          @booking.update(payment_type: 'stripe')
          return {
            url: nil,
            booking: @booking,
            payment: nil,
            notification: I18n.t('graphql.mutations.create_checkout.notifications.success')
          }
        end

        payments = @booking.payments.processing
        raise GraphQL::ExecutionError, 'multiple payments in process' if payments.count > 1

        if payments.any?
          payment = payments.last
          service.payment = payment

          checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)

          if checkout[:status] == 'complete'
            service.complete(checkout)

            return {
              url: nil,
              booking: @booking.reload,
              payment: payment.reload
            }
          end

          if checkout[:status] == 'expired'
            payment.cancel!
            checkout = service.generate_stripe_checkout_session
            return {
              url: checkout[:url],
              booking: @booking,
              payment: checkout[:payment],
              notification: I18n.t('graphql.mutations.create_checkout.notifications.redirection')
            }
          end

          return {
            url: checkout[:url],
            booking: @booking,
            payment: payment,
            notification: I18n.t('graphql.mutations.create_checkout.notifications.redirection')
          }
        end

        checkout = service.generate_stripe_checkout_session
        {
          url: checkout[:url],
          booking: @booking,
          payment: checkout[:payment],
          notification: I18n.t('graphql.mutations.create_checkout.notifications.redirection')
        }
      end
    end
  end
end
