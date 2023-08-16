# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class DeregisterAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      def resolve(attendee:, **_args)
        attendee.deregister!
        {
          attendee: attendee
        }
      end
    end
  end
end
