# frozen_string_literal: true

module Mutations
  class BookEvent < BaseMutation
    argument :event_id, ID, loads: Types::EventType
    argument :booked_for, Types::DateTimeType
    argument :attendees_count, Integer

    field :booking, Types::BookingType
    field :access_token, String

    def resolve(event:, **args)
      service = Stopover::BookingService.new(context[:current_user])
      booking = service.book_event(event, args[:booked_for], args[:attendees_count])
      context[:current_user] = booking.account.user
      {
        booking: booking,
        access_token: booking.user.access_token
      }
    end
  end
end
