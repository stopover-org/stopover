# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class BookEvent < BaseMutation
      argument :event_id, ID, loads: Types::EventsRelated::EventType
      argument :booked_for, Types::DateTimeType
      argument :attendees_count, Integer

      field :booking, Types::BookingsRelated::BookingType
      field :access_token, String

      def resolve(event:, **args)
        service = Stopover::BookingManagement::BookingCreator.new(context[:current_user])
        booking = service.perform(event, args[:booked_for], args[:attendees_count])
        context[:current_user] = booking.account.user
        {
          booking: booking,
          access_token: booking.user.access_token
        }
      end
    end
  end
end
