# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class RegisterAttendee < BaseMutation
      manager_only

      field :attendee, Types::BookingRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingRelated::AttendeeType
      def resolve(attendee:, **_args)
        attendee.register!

        {
          attendee: attendee
        }
      end
    end
  end
end
