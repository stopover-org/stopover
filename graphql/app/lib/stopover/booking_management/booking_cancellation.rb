# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingCancellation
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        check_permission

        @booking.cancel!

        @booking
      end

      private

      def check_permission
        raise 'Unauthorized' if @booking.user != @current_user
      end
    end
  end
end
