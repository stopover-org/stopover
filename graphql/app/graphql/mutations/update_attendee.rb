# frozen_string_literal: true

module Mutations
  class UpdateAttendee < BaseMutation
    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :event_options_id, [ID],
             loads: Types::EventOptionType,
             required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false
    argument :phone, String, required: false

    def resolve(attendee:, **args)
      if args[:event_options].present?
        attendee.attendee_options.destroy_all
        args[:event_options].each do |option|
          option.attendee_options.create!(attendee: attendee)
        end
      end

      attendee.update(**args)
      {
        attendee: attendee
      }
    end
  end
end
