# frozen_string_literal: true

module Mutations
  class UpdateBooking < BaseMutation
    argument :booking_id, ID, loads: Types::BookingType
    argument :status, String, required: false
    argument :booked_for, Types::DateTimeType, required: false

    field :booking, Types::BookingType
    def resolve(booking:, **args)
      schedule = booking.event.schedules.find_by(scheduled_for: args[:booked_for])
      booking.update(schedule: schedule, **args.except(:booked_for))
      {
        booking: booking
      }
    end
  end
end
