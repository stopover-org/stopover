# frozen_string_literal: true

module Mutations
  module EventsMutations
    class BookEvent < BaseMutation
      field :booking, Types::BookingRelated::BookingType
      field :access_token, String

      argument :event_id, ID, loads: Types::EventRelated::EventType
      argument :booked_for, Types::DateTimeType
      argument :attendees_count, Integer

      def resolve(event:, **args)
        booking = Stopover::BookingManagement::BookingCreator.new(context[:current_user])
                                                             .perform(event, args[:booked_for], args[:attendees_count])
        {
          booking: booking,
          access_token: booking.user.access_token
        }
      end
    end
  end
end
