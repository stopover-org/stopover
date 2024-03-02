# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class RemoveAttendee < BaseMutation
      AUTHORIZATION_FIELD = 'attendee'
      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized
      include Mutations::BookingsRelated::Authorizations::AttendeeAuthorized

      field :attendee, Types::BookingsRelated::AttendeeType
      field :booking, Types::BookingsRelated::BookingType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType

      def resolve(attendee:, **_args)
        Stopover::AttendeeManagement::RemoveAttendeeService.new(attendee, current_user).perform

        {
          attendee: attendee.reload,
          booking: attendee.booking,
          notification: I18n.t('graphql.mutations.remove_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil,
          booking: nil
        }
      end

      def authorized?(**inputs)
        record = authorization_field(inputs)

        return false, { errors: [I18n.t('graphql.errors.attendee_removed')] } if record.removed?

        super
      end
    end
  end
end
