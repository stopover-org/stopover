# frozen_string_literal: true

module Mutations
  class UpdateBooking < BaseMutation
    argument :booking_id, ID, loads: Types::BookingType
    argument :status, String
    field :booking, Types::BookingType
    def resolve(booking:, **args)
      booking.update(**args)
      {
        booking: booking
      }
    end
  end
end
