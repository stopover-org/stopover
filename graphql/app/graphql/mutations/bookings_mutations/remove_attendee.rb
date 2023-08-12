# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class RemoveAttendee < BaseMutation
      authorized_only
      authorize ->(attendee:) { 'You don\'t have permissions' if attendee.booking.user != current_user && current_firm != attendee.booking.firm }

      field :attendee, Types::BookingRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingRelated::AttendeeType
      def resolve(attendee:, **_args)
        attendee.remove!
        {
          attendee: attendee
        }
      end
    end
  end
end
