# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class CancelBooking < BaseMutation
      field :booking, Types::BookingsRelated::BookingType
      field :trip, Types::TripsRelated::TripType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        notify
        {
          booking: Stopover::BookingManagement::BookingCancellation.new(booking, current_user).perform,
          trip: booking.trip,
          notification: I18n.t('graphql.mutations.cancel_booking.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          trip: booking.trip,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        booking = inputs[:booking]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !current_user || current_user&.inactive?
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(booking) && !manager?(booking)

        return false, { errors: [I18n.t('graphql.errors.booking_past')] } if booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        super
      end

      def notify
        Notification.create!(
          delivery_method: 'email',
          to: booking.firm.primary_email,
          subject: 'Booking canceled',
          content: Stopover::MailProvider.prepare_content(
            file: 'mailer/auth/booking_related',
            locals: {
              title: booking.event.title,
              text: 'Your booking was cancelled'
            }
          )
        )
      end
    end
  end
end
