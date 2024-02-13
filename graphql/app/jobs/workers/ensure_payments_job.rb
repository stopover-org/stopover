# frozen_string_literal: true

module Workers
  class EnsurePaymentsJob < ApplicationJob
    queue_as :default

    def perform
      Payment.processing.each do |payment|
        checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)
        service = ::Stopover::StripeCheckoutService.new(payment)
        service.complete(checkout) if checkout[:status] == 'complete'
        payment.cancel! if checkout[:status] == 'expired'

        GraphqlSchema.subscriptions.trigger(:booking_changed, { bookingId: payment.booking.id }, { booking: payment.booking })
      end
    end
  end
end
