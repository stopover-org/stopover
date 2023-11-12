# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingCancellation
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        @booking.cancel!

        Notification.create!(
          delivery_method: 'email',
          to: @booking.account.primary_email,
          subject: 'Your booking was cancelled',
          content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/booking_cancelled',
                                                          locals: { booking: @booking })
        )

        Notification.create!(
          delivery_method: 'email',
          to: @booking.firm.primary_email,
          subject: 'Booking was cancelled',
          content: Stopover::MailProvider.prepare_content(file: 'mailer/firms/bookings/booking_cancelled',
                                                          locals: { booking: @booking,
                                                                    current_user: @current_user })
        )

        GraphqlSchema.subscriptions.trigger(:booking_changed, { bookingId: @booking.id }, { booking: @booking })

        Stopover::RefundManagement::RefundCreator.new(@booking, @current_user).perform

        @booking.trip.cancel! if @booking.trip.bookings.cancelled.count == @booking.trip.bookings.count && !@booking.trip.cancelled?

        @booking
      end
    end
  end
end
