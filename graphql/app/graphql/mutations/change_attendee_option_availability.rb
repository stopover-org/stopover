# frozen_string_literal: true

module Mutations
  class ChangeAttendeeOptionAvailability < BaseMutation
    field :attendee_option, Types::AttendeeOptionType

    argument :attendee_option_id, ID, loads: Types::AttendeeOptionType

    def resolve(attendee_option:, **_args)
      case attendee_option.status
      when 'available'
        attendee_option.disable!
      when 'not_available'
        attendee_option.restore!
      end

      {
        attendee_option: attendee_option
      }
    end
  end
end
