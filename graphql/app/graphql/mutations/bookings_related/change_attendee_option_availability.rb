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
          message = I18n.t('graphql.mutations.change_attendee_option_availability.notifications.unavailable')
        when 'not_available'
          attendee_option.restore!
          message = I18n.t('graphql.mutations.change_attendee_option_availability.notifications.available')
        end

        BookingManagement::PriceResetJob.perform_later(booking.id)
        notify
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

      private

      def authorized?(**inputs)
        attendee_option = inputs[:attendee_option]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(attendee_option)

        return false, { errors: [I18n.t('graphql.errors.event_past')] } if attendee_option.booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if attendee_option.booking.cancelled?
        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: booking.firm.primary_email,
          subject: 'Attendees options',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/booking_related',
            locals: {
              title: booking.event.title,
              text: 'You can now choose options for attendees'
            }
          )
        )
      end
    end
  end
end
