# frozen_string_literal: true

module Mutations
  class RemoveBooking < BaseMutation
    field :booking, Types::BookingType
    field :trip, Types::TripType

    argument :booking_id, ID, loads: Types::BookingType

    def resolve(booking:)
      booking.destroy!
      {
        booking: booking,
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
