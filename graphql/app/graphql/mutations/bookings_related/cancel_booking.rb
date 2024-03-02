# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class CancelBooking < BaseMutation
      AUTHORIZATION_FIELD = 'booking'
      include Mutations::Authorizations::ManagerOrOwnerAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized

      field :booking, Types::BookingsRelated::BookingType
      field :trip, Types::TripsRelated::TripType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingCancellation.new(booking, current_user).perform,
          trip: booking.trip,
          notification: I18n.t('graphql.mutations.cancel_booking.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          trip: booking.trip,
          errors: [message]
        }
      end
    end
  end
end
