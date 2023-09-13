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
        ::BookingManagement::PriceReset.perform_later(@booking.id)

        @booking
      end
    end
  end
end
