# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class CancelBooking < BaseMutation
      field :booking, Types::BookingsRelated::BookingType
      field :trip, Types::TripsRelated::TripType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingCancellation.new(booking, current_user).perform,
          trip: booking.trip,
          notification: 'Booking cancelled!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          trip: booking.trip,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        booking = inputs[:booking]
        return false, { errors: ['You are not authorized'] } if !current_user || current_user&.inactive?
        return false, { errors: ['You are not authorized'] } if !owner?(booking) && !manager?(booking)

        return false, { errors: ['Event past'] } if booking.past?
        return false, { errors: ['Booking was cancelled'] } if booking.cancelled?
        super
      end
    end
  end
end
