# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class UpdateAttendee < BaseMutation
      AUTHORIZATION_FIELD = 'attendee'

      include Mutations::Authorizations::ManagerOrOwnerAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized
      include Mutations::BookingsRelated::Authorizations::AttendeeAuthorized

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
          attendee.attendee_options.each do |option|
            option.destroy! unless args[:event_options].include?(option.event_option)
          end

          args[:event_options].each do |option|
            option.attendee_options.create!(attendee: attendee, event_option: option) unless attendee.attendee_options.map(&:event_option).include?(option)
          end
        end

        attendee.update!(**args.except(:event_options))

        attendee.booking.payments.processing.destroy_all

        {
          attendee: attendee.reload,
          notification: I18n.t('graphql.mutations.update_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil
        }
      end
    end
  end
end
