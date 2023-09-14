# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class ChangeAttendeeOptionAvailability < BaseMutation
      field :attendee_option, Types::BookingsRelated::AttendeeOptionType

      argument :attendee_option_id, ID, loads: Types::BookingsRelated::AttendeeOptionType

      def resolve(attendee_option:, **_args)
        booking = attendee_option.booking

        case attendee_option.status
        when 'available'
          attendee_option.disable!
          message = 'Attendee Option is unavailable from now'
        when 'not_available'
          attendee_option.restore!
          message = 'Attendee Option is available from now'
        end

        BookingManagement::PriceReset.perform_later(booking.id)

        {
          attendee_option: attendee_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          e: [e.message],
          attendee_option: nil
        }
      end

      private

      def authorized?(**inputs)
        attendee_option = inputs[:attendee_option]
        return false, { errors: ['You are not authorized'] } unless manager?(attendee_option)

        return false, { errors: ['Event past'] } if attendee_option.booking.past?
        return false, { errors: ['Booking was cancelled'] } if attendee_option.booking.cancelled?
        super
      end
    end
  end
end
