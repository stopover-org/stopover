# frozen_string_literal: true

module Workers
  class EnsureBookingsPaid < ApplicationJob
    queue_as :default

    def perform
      Booking.where.not(status: :cancelled).each do |booking|
        # debugger
        booking.refund_diff if booking.refundable?
        booking.partially_pay! if booking.partially_paid?
        booking.pay! if booking.left_to_pay_price.zero? && !booking.paid?
      end
    end
  end
end
