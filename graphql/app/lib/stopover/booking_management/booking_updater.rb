# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingUpdater
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def add_attendee
        check_permission

        @booking.attendees.create!

        @booking
      end

      private

      def check_permission
        return if @booking.user == @current_user || @booking.event.firm.accounts.include?(@current_user.account)
        raise 'Unauthorized'
      end
    end
  end
end
