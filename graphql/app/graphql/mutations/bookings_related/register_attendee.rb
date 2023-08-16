# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class RegisterAttendee < BaseMutation
      field :attendee, Types::AttendeeType

      argument :attendee_id, ID, loads: Types::AttendeeType
      def resolve(attendee:, **_args)
        attendee.register!
        {
          attendee: attendee
        }
      end
    end
  end
end
