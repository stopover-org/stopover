# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class UpdateBooking < BaseMutation
      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType
      argument :booked_for, Types::DateTimeType, required: false
      argument :event_option_ids, [ID],
               loads: Types::EventsRelated::EventOptionType,
               required: false

      field :booking, Types::BookingsRelated::BookingType
      def resolve(booking:, **args)
        Stopover::BookingManagement::BookingUpdater.new(booking, current_user).perform(**args)
        notify
        {
          booking: booking.reload,
          notification: I18n.t('graphql.mutations.update_booking.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          errors: [message]
        }
      end

      def authorized?(**inputs)
        booking = inputs[:booking]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(booking) && !manager?(booking)
        return false, { errors: [I18n.t('graphql.errors.booking_paid')] } if owner?(booking) && booking.payments.successful.any?
        return false, { errors: [I18n.t('graphql.errors.general')] } if booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        return false, { errors: [I18n.t('graphql.errors.event_past')] } if inputs[:booked_for]&.past?
        return false, { errors: [I18n.t('graphql.errors.general')] } if inputs[:event_options]&.select { |opt| opt.for_attendee }&.any?

        super
      end

      private

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: booking.firm.primary_email,
          subject: 'Booking changed',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/booking_related',
            locals: {
              title: booking.event.title,
              text: 'Your booking changed'
            }
          )
        )
      end
    end
  end
end
