# frozen_string_literal: true

module Workers
  class EnsurePaymentsJob < ApplicationJob
    queue_as :default

    def perform
      Payment.processing.each do |payment|
        checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)
        ::Stopover::StripeCheckoutService.complete(payment, checkout) if checkout[:status] == 'complete'
        payment.cancel! if checkout[:status] == 'expired'
      end
    end
  end
end
