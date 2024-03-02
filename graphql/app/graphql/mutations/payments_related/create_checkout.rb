# frozen_string_literal: true

module Mutations
  module PaymentsRelated
    class CreateCheckout < BaseMutation
      AUTHORIZATION_FIELD = 'booking'

      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::EventsRelated::Authorizations::ActiveEventAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized
      include Mutations::Authorizations::OwnerAuthorized

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
    end
  end
end
