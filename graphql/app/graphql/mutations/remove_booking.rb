# frozen_string_literal: true

module Mutations
  class RemoveBooking < BaseMutation
    field :booking, Types::BookingType
    argument :booking_id, ID, loads: Types::BookingType

    def resolve(booking:)
      booking.destroy!
      {
        booking: booking
      }
    end
  end
end
