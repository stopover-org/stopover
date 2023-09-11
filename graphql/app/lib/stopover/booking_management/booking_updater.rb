# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingUpdater
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def add_attendee
        @booking.attendees.create!

        @booking
      end
    end
  end
end
