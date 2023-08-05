# frozen_string_literal: true

module Mutations
  class UpdateAttendee < BaseMutation
    authorized_only
    authorize ->(attendee:) { 'You don\'t have permissions' if attendee.booking.user != current_user && current_firm != attendee.booking.firm }

    field :attendee, Types::AttendeeType

    argument :attendee_id, ID, loads: Types::AttendeeType
    argument :event_option_ids, [ID],
             loads: Types::EventOptionType,
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
    end
  end
end
