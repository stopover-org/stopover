module Mutations
  class BookEvent < BaseMutation
    argument :event_id, ID, loads: Types::EventType
    argument :booked_for, Types::DateTimeType
    argument :attendees_count, Integer

    field :booking, Types::BookingType

    def resolve(event:, **args)
      booking = event.bookings.create!(
          booked_for: args[:booked_for],
          attendees: (1..args[:attendees_count]).map{ Attendee.new }
      )

      {
          booking: booking
      }
    end
  end
end
