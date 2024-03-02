# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class CancelBooking < BaseMutation
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
      
      private

      def authorized?(**inputs)
        booking = inputs[:booking]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !current_user || current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(booking) && !manager?(booking)

        return false, { errors: [I18n.t('graphql.errors.booking_past')] } if booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        super
      end
    end
  end
end
