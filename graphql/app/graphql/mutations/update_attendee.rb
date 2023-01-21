# frozen_string_literal: true

module Mutations
  class UpdateAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false
    argument :phone, String, required: false

    def resolve(attendee:, **args)
      attendee.update(**args)
      {
        attendee: attendee
      }
    end
  end
end
