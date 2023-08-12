# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class ChangeAttendeeOptionAvailability < BaseMutation
      manager_only

      field :attendee_option, Types::BookingRelated::AttendeeOptionType

      argument :attendee_option_id, ID, loads: Types::BookingRelated::AttendeeOptionType

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
end
