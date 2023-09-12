# frozen_string_literal: true

module Stopover
  module AttendeeManagement
    class AddAttendeeService
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        @booking.attendees.create!
        @booking.refund_diff if @booking.refundable?

        @booking
      end
    end
  end
end
