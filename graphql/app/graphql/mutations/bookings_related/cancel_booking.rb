# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class CancelBooking < BaseMutation
      field :booking, Types::BookingsRelated::BookingType
      field :trip, Types::TripsRelated::TripType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingCancellation.new(booking, context[:current_user]).perform,
          trip: booking.trip
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          trip: booking.trip
        }
      end
    end
  end
end