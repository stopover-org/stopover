# frozen_string_literal: true

module Mutations
  class RemoveAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    def resolve(attendee:, **_args)
      attendee.soft_delete!
      {
        attendee: attendee
      }
    end
  end
end
