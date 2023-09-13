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
        ::BookingManagement::PriceReset.perform_later(@booking.id)

        @attendee
      end
    end
  end
end
