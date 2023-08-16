# frozen_string_literal: true

module Mutations
  module PaymentsRelated
    class CreateCheckout < BaseMutation
      field :booking, Types::BookingType
      field :url, String
      field :payment, Types::PaymentType

      argument :payment_type, Types::PaymentTypesEnum
      argument :booking_id, ID, loads: Types::BookingType

      def resolve(booking:, **args)
        payments = booking.payments.where(payment_type: args[:payment_type]).processing
        raise GraphQL::ExecutionError, 'multiple payments in process' if payments.count > 1

        if payments.any?
          payment = payments.last

          checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)

          if checkout[:status] == 'complete'
            ::Stopover::StripeCheckoutService.complete(payment)
            return {
              url: nil,
              booking: booking.reload,
              payment: payment.reload
            }
          end

          if checkout[:status] == 'expired'
            payment.cancel!
            checkout = Stopover::StripeCheckoutService.generate_stripe_checkout_session(booking, args[:payment_type])
            return {
              url: checkout[:url],
              booking: booking,
              payment: checkout[:payment]
            }
          end
          return {
            url: checkout[:url],
            booking: booking,
            payment: payment
          }
        end

        checkout = Stopover::StripeCheckoutService.generate_stripe_checkout_session(booking, args[:payment_type])

        {
          url: checkout[:url],
          booking: booking,
          payment: checkout[:payment]
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          url: nil,
          booking: booking,
          payment: nil
        }
      end
    end
  end
end
