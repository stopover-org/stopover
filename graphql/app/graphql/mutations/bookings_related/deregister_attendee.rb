# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class DeregisterAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      def resolve(attendee:, **_args)
        attendee.deregister!
        notify
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

      private

      def authorized?(**inputs)
        attendee = inputs[:attendee]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(attendee)

        return false, { errors: [I18n.t('graphql.errors.attendee_removed')] } if attendee.removed?
        return false, { errors: [I18n.t('graphql.errors.general')] } if attendee.not_registered?
        return false, { errors: [I18n.t('graphql.errors.event_past')] } if attendee.booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if attendee.booking.cancelled?
        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: booking.firm.primary_email,
          subject: 'Attendee deregistred',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/booking_related',
            locals: {
              title: booking.event.title,
              text: 'Attendee was deregistred'
            }
          )
        )
      end
    end
  end
end
