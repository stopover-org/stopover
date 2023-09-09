# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class AddAttendee < BaseMutation
      field :booking, Types::BookingsRelated::BookingType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingUpdater.new(booking, context[:current_user]).add_attendee,
          notification: 'Attendee was added!'
        }
      end

      def authorized?(**inputs)
        booking = inputs[:booking]

        return false, { errors: ['You are not authorized'] } if !owner?(booking) && !manager?(booking)
        return false, { errors: ['Booking cancelled'] } if booking.cancelled?
        return false, { errors: ['Booking past'] } if booking.past?
        return false, { errors: ['All places are reserved'] } if booking.event.max_attendees && Attendee.where(booking_id: booking.id).count >= booking.event.max_attendees

        super
      end
    end
  end
end
