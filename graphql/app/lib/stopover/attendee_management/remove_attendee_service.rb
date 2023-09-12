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
        @attendee.remove!
        @booking.refund_diff if @booking.refundable?

        @attendee
      end
    end
  end
end
