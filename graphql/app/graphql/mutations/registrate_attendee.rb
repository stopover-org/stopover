# frozen_string_literal: true

module Mutations
  class RegistrateAttendee < BaseMutation
    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :registrate, Boolean

    field :attendee, Types::AttendeeType

    def resolve(attendee:, registrate:)
      attendee.update!(is_registered: registrate)
      {
        attendee: attendee
      }
    end
  end
end
