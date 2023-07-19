# frozen_string_literal: true

module Mutations
  class RegisterAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    def resolve(attendee:, **_args)
      attendee.register!
      {
        attendee: attendee.reload
      }
    end
  end
end
