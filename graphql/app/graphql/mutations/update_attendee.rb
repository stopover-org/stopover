# frozen_string_literal: true

module Mutations
  class UpdateAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :event_option_id, Array[ID], loads: Types::EventOptionType, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false
    argument :phone, String, required: false

    def resolve(attendee:, **args)
      # event_option.update(attendee: attendee)

      attendee.update(**args)
      {
        attendee: attendee
      }
    end
  end
end
