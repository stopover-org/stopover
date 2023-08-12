# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingUpdater
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def add_attendee
        @booking.attendees.create!
        @booking.ensure_paid

        notify_attendee
        notify_manager

        @booking
      end

      private

      def notify_attendee
        Notification.create!(
          origin_key: Notification::ORIGIN_KEYS[:trip_attendee_added],
          to: @booking.trip.delivery_to,
          subject: 'Attendee added',
          content: Stopover::MailProvider.prepare_content(file: "mailer/#{Notification::ORIGIN_KEYS[:trip_attendee_added]}",
                                                          locals: { booking: @booking }),
          delivery_method: @booking.trip.delivery_method
        )
      end

      def notify_manager
        Notification.create!(
          origin_key: Notification::ORIGIN_KEYS[:firm_attendee_added],
          to: @booking.firm.delivery_to,
          subject: 'Attendee added',
          content: Stopover::MailProvider.prepare_content(file: "mailer/#{Notification::ORIGIN_KEYS[:firm_attendee_added]}",
                                                          locals: { booking: @booking }),
          delivery_method: @booking.firm.delivery_method
        )
      end
    end
  end
end
