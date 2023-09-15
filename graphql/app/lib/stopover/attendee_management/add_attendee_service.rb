# frozen_string_literal: true

module Stopover
  module AttendeeManagement
    class AddAttendeeService
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        return if @booking.cancelled?

        @booking.attendees.create!
        ::BookingManagement::PriceResetJob.perform_later(@booking.id)

        @booking
      end
    end
  end
end
