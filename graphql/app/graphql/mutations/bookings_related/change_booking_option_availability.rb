# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class ChangeBookingOptionAvailability < BaseMutation
      field :booking_option, Types::BookingsRelated::BookingOptionType

      argument :booking_option_id, ID, loads: Types::BookingsRelated::BookingOptionType

      def resolve(booking_option:, **_args)
        booking = booking_option.booking

        case booking_option.status
        when 'available'
          booking_option.disable!
          message = I18n.t('graphql.mutations.change_booking_option_availability.notifications.unavailable')
        when 'not_available'
          booking_option.restore!
          message = I18n.t('graphql.mutations.change_booking_option_availability.notifications.available')
        end

        BookingManagement::PriceResetJob.perform_later(booking.id)

        {
          booking_option: booking_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          booking_option: nil
        }
      end

      private

      def authorized?(**inputs)
        booking_option = inputs[:booking_option]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(booking_option)

        return false, { errors: [I18n.t('graphql.errors.event_past')] } if booking_option.booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking_option.booking.cancelled?
        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: booking.firm.primary_email,
          subject: 'Booking options',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/booking_related',
            locals: {
              title: booking.event.title,
              text: 'You can now choose options for booking'
            }
          )
        )
      end
    end
  end
end
