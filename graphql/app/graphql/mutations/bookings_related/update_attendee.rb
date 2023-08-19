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
          attendee: attendee
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          attendee: nil,
          error: e.message
        }
      end
    end
  end
end