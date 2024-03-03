# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class DeregisterAttendee < BaseMutation
      AUTHORIZATION_FIELD = 'attendee'
      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized
      include Mutations::BookingsRelated::Authorizations::AttendeeAuthorized

      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType

      def resolve(attendee:, **_args)
        attendee.deregister!

        {
          attendee: attendee,
          notification: I18n.t('graphql.mutations.deregister_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil
        }
      end

      def authorized?(**inputs)
        record = authorization_field(inputs)

        return false, { errors: [I18n.t('graphql.errors.general')] } if record.not_registered?

        super
      end
    end
  end
end
