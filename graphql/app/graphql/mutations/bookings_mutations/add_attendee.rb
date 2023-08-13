# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class AddAttendee < BaseMutation
      authorized_only
      authorize lambda { |booking:, current_user:, current_firm:, **_args|
        booking = GraphqlSchema.object_from_id(booking)
        return Mutations::BookingsMutations::AddAttendee.validate(booking, current_user, current_firm)
      }

      field :booking, Types::BookingRelated::BookingType

      argument :booking_id, ID, loads: Types::BookingRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingUpdater.new(booking, current_user).add_attendee,
          notification: 'Attendee added'
        }
      end

      def self.validate(booking, current_user, current_firm)
        return 'You don\'t have permissions' if booking.user != current_user && current_firm != booking.firm

        return 'Booking was cancelled' if booking.cancelled?

        return 'Event past' if booking.schedule.scheduled_for.past?

        return 'All places are occupied' if booking.event.max_attendees && booking.event.max_attendees <= booking.schedule.attendees.count
      end
    end
  end
end
