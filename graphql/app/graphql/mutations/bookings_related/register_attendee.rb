# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class RegisterAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      def resolve(attendee:, **_args)
        attendee.register!
        {
          attendee: attendee,
          notification: 'Attendee was registered!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          e: [e.message],
          attendee: nil
        }
      end

      private

      def authorized?(**inputs)
        attendee = inputs[:attendee]
        return false, { errors: ['You are not authorized'] } unless manager?(attendee)

        return false, { errors: ['Attendee was removed'] } if attendee.removed?
        return false, { errors: ['Attendee was registered already'] } if attendee.registered?
        return false, { errors: ['Event past'] } if attendee.booking.past?
        return false, { errors: ['Booking was cancelled'] } if attendee.booking.cancelled?
        super
      end
    end
  end
end
