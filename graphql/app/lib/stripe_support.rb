# frozen_string_literal: true

class StripeSupport
  def self.generate_stripe_checkout_session(booking, payment_type)
    event_stripe_integration = booking.event.stripe_integrations.where(price_type: payment_type).first

    event_options = booking.event_options
    # TODO: add attendee options to checkout

    payment = Payment.create!(booking: booking)
    checkout = Stripe::Checkout::Session.create({
                                                  line_items: [{
                                                    price: event_stripe_integration.price_id,
                                                                 quantity: booking.attendees.count
                                                  },
                                                               *event_options.map do |opt|
                                                                 {
                                                                   price: opt.stripe_integration.price_id,
                                                                   quantity: 1
                                                                 }
                                                               end],
                                                  mode: 'payment',
                                                  success_url: "http://localhost:3000/checkouts/success/#{GraphqlSchema.id_from_object(payment)}",
                                                  cancel_url: "http://localhost:3000/checkouts/cancel/#{GraphqlSchema.id_from_object(payment)}",
                                                  expires_at: 1_800
                                                })
    payment.stripe_checkout_session_id = checkout[:id]
    payment.process!
    {
      url: checkout[:url],
      payment: payment
    }
  rescue StandardError => e
    {
      url: nil,
      payment: payment
    }
  end
end
