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
        same_firm = @booking.user == @current_user || @booking.event.firm.accounts.include?(@current_user.account)
        if same_firm
          raise 'All places reserved' if @booking.attendees.count == @booking.event.max_attendees
          raise 'Booking was already paid' if @booking.paid?
          return
        end
        raise 'Unauthorized'
      end
    end
  end
end
