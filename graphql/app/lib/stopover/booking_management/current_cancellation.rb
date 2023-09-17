# frozen_string_literal: true

module Stopover
  module BookingManagement
    class CurrentCancellation
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        current_cancellation_option
      end

      def terms
        return 'Booking will be cancelled without refunds' if @booking.already_paid_price.zero?

        cancellation_option = current_cancellation_option
        if cancellation_option
          "Cancellation will result #{cancellation_option.penalty_price.format} penalty. #{(@booking.already_paid_price - cancellation_option.penalty_price).format} will be refunded"
        else
          'Booking will be fully refunded'
        end
      end

      def current_cancellation_option
        return nil if include_penalty?

        time_diff = (@booking.schedule.scheduled_for - Time.current) / 3600

        @booking.event.booking_cancellation_options.active.where('deadline > :time_diff', time_diff: time_diff).order(deadline: :asc).last
      end

      def include_penalty?
        @current_user.account.current_firm == @booking.firm
      end
    end
  end
end
