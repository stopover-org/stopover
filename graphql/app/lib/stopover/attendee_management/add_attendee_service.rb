# frozen_string_literal: true

module Stopover
  module AttendeeManagement
    class AddAttendeeService
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        return if @booking.cancelled?

        @booking.attendees.create!
        @booking.payments.processing.destroy_all
        ::BookingManagement::PriceResetJob.perform_later(@booking.id)

        Notification.create!(
          delivery_method: 'email',
          to: @booking.account.primary_email,
          subject: 'Attendee was added to your booking',
          content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/attendee_added',
                                                          locals: { booking: @booking })
        )

        Notification.create!(
          delivery_method: 'email',
          to: @booking.firm.primary_email,
          subject: 'Attendee was added to the booking',
          content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/bookings/attendee_added',
                                                          locals: { booking: @booking, user: @current_user })
        )

        @booking
      end
    end
  end
end
