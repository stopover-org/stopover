# frozen_string_literal: true

module Workers
  class EnsureBookingsPaidJob < ApplicationJob
    def perform
      Booking.where.not(status: :cancelled)
             .joins(:schedule)
             .where('schedules.scheduled_for > ?', Time.current)
             .each do |booking|
        booking.reload
        booking.refund_diff if booking.refundable?
        booking.partially_pay! if booking.partially_paid?
        booking.pay! if booking.left_to_pay_price.zero? && !booking.paid?

        GraphqlSchema.subscriptions.trigger(:booking_changed, { bookingId: booking.id }, { booking: booking })
      end
    end
  end
end
