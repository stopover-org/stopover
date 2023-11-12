# frozen_string_literal: true

module Stopover
  module AttendeeManagement
    class RemoveAttendeeService
      def initialize(attendee, current_user)
        @attendee = attendee
        @booking = @attendee.booking
        @current_user = current_user
      end

      def perform
        return if @booking.cancelled?

        @attendee.remove!
        @booking.payments.processing.destroy_all
        ::BookingManagement::PriceResetJob.perform_later(@booking.id)

        Notification.create!(delivery_method: 'email',
                             to: @booking.account.primary_email,
                             subject: 'Attendee was removed from your booking',
                             content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/attendee_removed',
                                                                             locals: { booking: @booking }))

        Notification.create!(delivery_method: 'email',
                             to: @booking.firm.primary_email,
                             subject: 'Attendee was removed from the booking',
                             content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/bookings/attendee_removed',
                                                                             locals: { booking: @booking, user: @current_user }))

        @attendee
      end
    end
  end
end
