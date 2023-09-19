# frozen_string_literal: true

module BookingManagement
  class PriceResetJob < ApplicationJob
    queue_as :default

    def perform(booking_id)
      booking = Booking.find(booking_id)

      booking.refund_diff if booking.refundable?
      booking.partially_pay! if booking.partially_paid?
      booking.payments.processing.find_each do |payment|
        checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)
        ::Stopover::StripeCheckoutService.complete(payment, checkout) if checkout[:status] == 'complete'
        ::Stopover::StripeCheckoutService.expire_checkout_session(payment) if checkout[:status] == 'open'
      end

      GraphqlSchema.subscriptions.trigger(:booking_changed, { bookingId: booking.id }, { booking: booking })
    end
  end
end
