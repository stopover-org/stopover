# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingCancellation
      def initialize(booking, current_account)
        @booking = booking
        @current_account = current_account
      end

      def perform
        @booking.cancelled_by = @current_account

        if @current_account == @booking.account
          refund_with_penalty
        else
          refund
        end

        @booking.cancel!

        @booking
      end

      def refund
        if @booking.already_paid_price.positive?
          @booking.refunds.build(author_type: 'manager',
                                 balance: @booking.firm.balance,
                                 account: @current_account,
                                 amount: @booking.already_paid_price)
        end
      end

      def refund_with_penalty
        cancellation_option = @booking.current_cancellation_option

        refund_diff = 0
        refund_diff = @booking.already_paid_price - cancellation_option.penalty_price if cancellation_option
        refund_amount = refund_diff.positive? ? refund_diff : @booking.already_paid_price

        if refund_amount.positive?
          refund_entity = @booking.refunds.build(author_type: 'attendee',
                                                 balance: @booking.firm.balance,
                                                 account: @current_account,
                                                 amount: refund_amount)
          if cancellation_option
            Penalty.create!(balance: @booking.firm.balance,
                            refund: refund_entity,
                            booking: @booking,
                            booking_cancellation_option: cancellation_option,
                            amount: cancellation_option.penalty_price)
          end
        end
      end
    end
  end
end
