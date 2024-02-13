# frozen_string_literal: true

module Mutations
  module PaymentsRelated
    class CreateCheckout < BaseMutation
      field :booking, Types::BookingsRelated::BookingType
      field :url, String
      field :payment, Types::PaymentsRelated::PaymentType

      argument :payment_type, Types::PaymentsRelated::PaymentTypesEnum
      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:, payment_type:)
        service = Stopover::PaymentsManagement::CheckoutCreator.new(booking, payment_type)

        service.perform
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

        super
      end
    end
  end
end
