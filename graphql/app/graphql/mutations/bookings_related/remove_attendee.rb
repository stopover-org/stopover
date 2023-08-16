# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class RemoveAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      def resolve(attendee:, **_args)
        attendee.remove!
        {
          attendee: attendee
        }
      end
    end
  end
end
