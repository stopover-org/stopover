# frozen_string_literal: true

module Mutations
  class UpdateAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :first_name, String
    argument :last_name, String
    argument :email, String
    argument :phone_number, String

    def resolve(attendee:, **args)
      attendee.update(**args)
      {
        attendee: attendee
      }
    end
  end
end
