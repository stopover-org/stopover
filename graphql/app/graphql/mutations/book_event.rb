# frozen_string_literal: true

module Mutations
  class BookEvent < BaseMutation
    argument :event_id, ID, loads: Types::EventType
    argument :booked_for, Types::DateTimeType
    argument :attendees_count, Integer

    field :booking, Types::BookingType
    field :access_token, String

    def resolve(event:, **args)
      booking_support = Stopover::BookingService.new(context[:current_user])
      booking = booking_support.book_event(event, args[:booked_for], args[:attendees_count])
      {
        booking: booking,
        access_token: booking.user.access_token
      }
    end
  end
end
