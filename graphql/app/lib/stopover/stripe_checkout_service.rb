# frozen_string_literal: true

module Stopover
  class StripeCheckoutService
    def self.complete(payment)
      payment.success!
      payment.booking.paid! if payment.full_amount? || payment.remaining_amount?
      payment.booking.trip.activate!

      payment
    end

    def self.generate_stripe_checkout_session(booking, payment_type)
      event_stripe_integration = booking.event.stripe_integrations.active.find_by(price_type: payment_type)

      payment = Payment.create!(booking: booking, payment_type: payment_type, balance: booking.event.firm.balance)
      payment.stripe_integrations << event_stripe_integration
      attendee_options = {}

      booking.attendees.map do |att|
        att.attendee_options.each do |opt|
          stripe_integration = opt.event_option.stripe_integrations.active.last

          if attendee_options[opt.event_option.id].nil?
            attendee_options[opt.event_option.id] = if opt.event_option.built_in
                                                      {
                                                        price_data: ::Stopover::StripeIntegrator.empty_price(stripe_integration),
                                                        quantity: 0
                                                      }
                                                    else
                                                      {
                                                        price: stripe_integration.price_id,
                                                        quantity: 0
                                                      }
                                                    end
          end

          payment.stripe_integrations << stripe_integration

          attendee_options[opt.event_option.id][:quantity] += 1
        end
      end

      booking_options = booking.booking_options.map do |opt|
        stripe_integration = opt.event_option.stripe_integrations.active.last

        payment.stripe_integrations << stripe_integration

        if opt.event_option.built_in
          {
            price_data: ::Stopover::StripeIntegrator.empty_price(stripe_integration),
            quantity: 1
          }
        else
          {
            price: stripe_integration.price_id,
            quantity: 1
          }
        end
      end
      # TODO: dont know how to covered by test

      checkout = Stripe::Checkout::Session.create({
                                                    line_items: [
                                                      {
                                                        price: event_stripe_integration.price_id,
                                                        quantity: booking.attendees.count
                                                      },
                                                      *booking_options,
                                                      *attendee_options.values
                                                    ],
                                                    mode: 'payment',
                                                    success_url: "http://localhost:3000/checkouts/success/#{GraphqlSchema.id_from_object(payment)}",
                                                    cancel_url: "http://localhost:3000/checkouts/cancel/#{GraphqlSchema.id_from_object(payment)}",
                                                    expires_at: (Time.zone.now + (30 * 60)).to_i
                                                  })
      payment.stripe_checkout_session_id = checkout[:id]
      payment.save!
      payment.process!

      {
        url: checkout[:url],
        payment: payment
      }
    end
  end
end
