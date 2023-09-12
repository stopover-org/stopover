# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingCancellation
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform
        @booking.cancel!

        refund = calculate_refund
        penalty = calculate_penalty

        if refund
          @booking.refunds.create!(penalty_amount: penalty,
                                   refund_amount: refund,
                                   booking: @booking,
                                   account: @current_user.account,
                                   booking_cancellation_option: cancellation_option)
        end

        @booking
      end

      def calculate_refund
        return nil if @booking.already_paid_price.zero?

        @booking.already_paid_price - calculate_penalty
      end

      def calculate_penalty
        return Money.new(0) if include_penalty?

        cancellation_option&.penalty_price || Money.new(0)
      end

      def cancellation_option
        return nil if include_penalty?

        time_diff = (@booking.schedule.scheduled_for - Time.current) / 3600

        @booking.booking_cancellation_options.active.where('deadline > :time_diff', time_diff: time_diff).order(deadline: :asc).last
      end

      def include_penalty?
        @current_user.account.current_firm == @booking.firm
      end
    end
  end
end
