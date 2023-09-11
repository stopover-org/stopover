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

        @booking
      end
    end
  end
end
