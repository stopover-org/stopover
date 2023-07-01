# frozen_string_literal: true

module Mutations
  class RegisterAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    def resolve(attendee:, **_args)
      attendee.update!(is_registered: true)
      {
        attendee: attendee
      }
    end
  end
end
