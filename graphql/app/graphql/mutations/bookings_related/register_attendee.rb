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
          notification: I18n.t('graphql.mutations.register_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil
        }
      end

      private

      def authorized?(**inputs)
        attendee = inputs[:attendee]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(attendee)

        return false, { errors: [I18n.t('graphql.errors.attendee_removed')] } if attendee.removed?
        return false, { errors: [I18n.t('graphql.errors.general')] } if attendee.registered?
        return false, { errors: [I18n.t('graphql.errors.event_past')] } if attendee.booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if attendee.booking.cancelled?
        super
      end
    end
  end
end
