# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class UpdateAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      argument :event_option_ids, [ID],
               loads: Types::EventsRelated::EventOptionType,
               required: false
      argument :first_name, String, required: false
      argument :last_name, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false

      def resolve(attendee:, **args)
        if args[:event_options].is_a? Array
          attendee.attendee_options.destroy_all
          args[:event_options].each do |option|
            option.attendee_options.create!(attendee: attendee, event_option: option)
          end
        end

        attendee.update!(**args.except(:event_options))
        {
          attendee: attendee,
          notification: 'Attendee was updated!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          attendee: nil,
          errors: [e.message]
        }
      end

      def authorized?(**inputs)
        attendee = inputs[:attendee]
        booking = attendee.booking

        return false, { errors: ['You are not authorized'] } if !owner?(booking) && !manager?(booking)
        return false, { errors: ['Booking cancelled'] } if booking.cancelled?
        return false, { errors: ['Event past'] } if booking.past?
        return false, { errors: ['Attendee was removed'] } if attendee.removed?
        return false, { errors: ['Wrong option type'] } if inputs[:event_options]&.reject { |opt| opt.for_attendee }&.any?

        super
      end
    end
  end
end
