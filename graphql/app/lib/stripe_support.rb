# frozen_string_literal: true

class StripeSupport
  def self.generate_stripe_checkout_session(booking, payment_type)
    event_stripe_integration = booking.event.stripe_integrations.where(price_type: payment_type).first
    payment = Payment.create!(booking: booking)

    attendee_options = {}
    booking.attendees.map do |att|
      att.attendee_options.each do |att_opt|
        if attendee_options[att_opt.event_option.id].nil?
          attendee_options[att_opt.event_option.id] = {
            price: att_opt.event_option.stripe_integration.price_id,
            quantity: 0
          }
        end

        attendee_options[att_opt.event_option.id][:quantity] += 1
      end
    end

    booking_options = booking.booking_options.map do |opt|
      {
        price: opt.event_option.stripe_integration.price_id,
        quantity: 1
      }
    end
    # TODO: dont know how to covered by test

    checkout = Stripe::Checkout::Session.create({
                                                  line_items: [{
                                                    price: event_stripe_integration.price_id,
                                                                 quantity: booking.attendees.count
                                                  },
                                                               *booking_options,
                                                               *attendee_options.values],
                                                  mode: 'payment',
                                                  success_url: "http://localhost:3000/checkouts/success/#{GraphqlSchema.id_from_object(payment)}",
                                                  cancel_url: "http://localhost:3000/checkouts/cancel/#{GraphqlSchema.id_from_object(payment)}",
                                                  expires_at: (Time.zone.now + (30 * 60)).to_i
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
