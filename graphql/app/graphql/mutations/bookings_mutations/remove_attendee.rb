# frozen_string_literal: true

module Mutations
  class RemoveAttendee < BaseMutation
    authorized_only
    authorize ->(attendee:) { 'You don\'t have permissions' if attendee.booking.user != current_user && current_firm != attendee.booking.firm }

    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    def resolve(attendee:, **_args)
      attendee.remove!
      {
        attendee: attendee
      }
    end
  end
end
