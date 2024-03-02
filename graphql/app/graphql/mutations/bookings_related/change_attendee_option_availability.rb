# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class ChangeAttendeeOptionAvailability < BaseMutation
      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::BookingsRelated::Authorizations::AttendeeOptionAuthorized

      field :attendee_option, Types::BookingsRelated::AttendeeOptionType

      argument :attendee_option_id, ID, loads: Types::BookingsRelated::AttendeeOptionType

      def resolve(attendee_option:, **_args)
        booking = attendee_option.booking

        case attendee_option.status
        when 'available'
          attendee_option.disable!
          message = I18n.t('graphql.mutations.change_attendee_option_availability.notifications.unavailable')
        when 'not_available'
          attendee_option.restore!
          message = I18n.t('graphql.mutations.change_attendee_option_availability.notifications.available')
        end

        BookingManagement::PriceResetJob.perform_later(booking.id)

        {
          attendee_option: attendee_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee_option: nil
        }
      end

      def authorization_field(inputs)
        inputs[:attendee_option]
      end
    end
  end
end
