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
        return false, { errors: ['You are not authorized'] } if inputs[:booking].account != current_account && !current_firm
        return false, { errors: ['Booking cancelled'] } if inputs[:booking].cancelled?
        return false, { errors: ['Booking past'] } if inputs[:booking].past?
        return false, { errors: ['All places are reserved'] } if inputs[:booking].event.max_attendees && Attendee.where(booking_id: inputs[:booking].id).count >= inputs[:booking].event.max_attendees

        super
      end
    end
  end
end
