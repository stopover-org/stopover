# frozen_string_literal: true

module Mutations
  module PaymentsRelated
    class CreateCheckout < BaseMutation
      field :booking, Types::BookingsRelated::BookingType
      field :url, String
      field :payment, Types::PaymentsRelated::PaymentType

      argument :payment_type, Types::PaymentsRelated::PaymentTypesEnum
      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:, **args)
        if args[:payment_type] == 'deposit' && booking.left_to_pay_deposit_price.zero?
          booking.update(payment_type: 'cash')
          return {
            url: nil,
            booking: booking,
            payment: nil,
            notification: I18n.t('graphql.mutations.create_checkout.notifications.success')
          }
        end

        if args[:payment_type] == 'full_amount' && booking.left_to_pay_price.zero?
          booking.update(payment_type: 'stripe')
          return {
            url: nil,
            booking: booking,
            payment: nil,
            notification: I18n.t('graphql.mutations.create_checkout.notifications.success')
          }
        end

        payments = booking.payments.processing
        raise GraphQL::ExecutionError, 'multiple payments in process' if payments.count > 1

        if payments.any?
          payment = payments.last

          checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)

          if checkout[:status] == 'complete'
            ::Stopover::StripeCheckoutService.complete(payment, checkout)
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
              payment: checkout[:payment],
              notification: I18n.t('graphql.mutations.create_checkout.notifications.redirection')
            }
          end

          return {
            url: checkout[:url],
            booking: booking,
            payment: payment,
            notification: I18n.t('graphql.mutations.create_checkout.notifications.redirection')
          }
        end

        checkout = Stopover::StripeCheckoutService.generate_stripe_checkout_session(booking, args[:payment_type])
        {
          url: checkout[:url],
          booking: booking,
          payment: checkout[:payment],
          notification: I18n.t('graphql.mutations.create_checkout.notifications.redirection')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          url: nil,
          booking: booking,
          payment: nil,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        booking = inputs[:booking]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless owner?(booking)
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_user&.active?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        return false, { errors: [I18n.t('graphql.errors.firm_removed')] } if booking.firm.removed?
        return false, { errors: [I18n.t('graphql.errors.event_removed')] } if booking.event.removed?
        return false, { errors: [I18n.t('graphql.errors.general')] } unless booking.stripe_integration&.active?
        return false, { errors: [I18n.t('graphql.errors.general')] } unless booking.firm.payment_types.include?('stripe')

        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: Stopover::MailProvider::NOTIFICATION_EMAIL,
          subject: 'Checkout created',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/',
            locals: {
              title: booking.event.title,
              text: 'Checkout created'
            }
          )
        )
      end
    end
  end
end
