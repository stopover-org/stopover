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

        GraphqlSchema.subscriptions.trigger(:booking_changed, {}, { booking: @booking })

        Stopover::RefundManagement::RefundCreator.new(@booking, @current_user).perform

        @booking.trip.cancel! if @booking.trip.bookings.cancelled.count == @booking.trip.bookings.count && !@booking.trip.cancelled?

        @booking
      end
    end
  end
end
