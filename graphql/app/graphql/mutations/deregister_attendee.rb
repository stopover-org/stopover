# frozen_string_literal: true

module Mutations
  class DeregisterAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    def resolve(attendee:, **_args)
      attendee.deregister!
      {
        attendee: attendee
      }
    end
  end
end
