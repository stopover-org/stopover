# frozen_string_literal: true

module Mutations
  class CancelBooking < BaseMutation
    field :booking, Types::BookingType
    field :trip, Types::TripType

    argument :booking_id, ID, loads: Types::BookingType

    def resolve(booking:)
      {
        booking: Stopover::BookingManagement::BookingCancellation.new(booking, context[:current_user]).perform,
        trip: booking.trip
      }
    rescue StandardError => e
      {
        booking: nil,
        trip: booking.trip,
        error: e.message
      }
    end
  end
end