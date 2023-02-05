# frozen_string_literal: true

module Mutations
  class RegisterAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :is_registered, Boolean
    def resolve(attendee:, **args)
      attendee.update!(is_registered: args[:is_registered])
      {
        attendee: attendee
      }
    end
  end
end
