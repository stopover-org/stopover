# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class AddAttendee < BaseMutation
      field :booking, Types::BookingsRelated::BookingType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        Stopover::AttendeeManagement::AddAttendeeService.new(booking, current_user).perform
        notify
        {
          booking: booking.reload,
          notification: I18n.t('graphql.mutations.add_attendee.notifications.success')
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
        booking = inputs[:booking]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(booking) && !manager?(booking)
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        return false, { errors: [I18n.t('graphql.errors.booking_past')] } if booking.past?
        return false, { errors: [I18n.t('graphql.errors.all_places_reserved')] } if booking.event.max_attendees && Attendee.where(booking_id: booking.id)
                                                                                                                           .where.not(status: 'removed')
                                                                                                                           .count >= booking.event.max_attendees

        super
      end

      private

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: current_firm.primary_email,
          subject: 'New attendee',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/',
            locals: {
              title: current_firm.title,
              text: 'Attendee was added'
            }
          )
        )
      end
    end
  end
end
