# frozen_string_literal: true

module Stopover
  class StripeCheckoutService
    def self.complete(payment)
      payment.success!
      payment.booking.pay! if payment.full_amount?
      payment.booking.trip.activate!

      payment
    end

    def self.generate_stripe_checkout_session(booking, payment_type)
      event_stripe_integration = booking.event.stripe_integrations.active.find_by(price_type: 'full_amount')

      raise InternalServerError, "event wasn't integrated with stripe" if event_stripe_integration.nil?

      payment = booking.payments.create!(payment_type: payment_type, balance: booking.event.firm.balance)
      payment.stripe_integrations << event_stripe_integration

      case payment_type
      when 'full_amount'
        generate_session_full_amount(booking: booking,
                                     payment: payment)
      when 'deposit'
        generate_session_deposit(booking: booking,
                                 payment: payment)
      end
    end

    def self.generate_session_full_amount(booking:, payment:)
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
                                                      success_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(payment)}",
                                                      cancel_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(payment)}",
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

    def self.generate_session_deposit(booking:, payment:)
      checkout = Stripe::Checkout::Session.create({
                                                    line_items: [
                                                      {
                                                        price_data: { currency: 'usd',
                                                                        product_data: { name: booking.event.title },
                                                                        unit_amount: booking.event.deposit_amount.cents },
                                                            quantity: 1
                                                      }
                                                    ],
                                                      mode: 'payment',
                                                      success_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(payment)}",
                                                      cancel_url: "#{Rails.application.credentials.frontend_url}/checkouts/verify/#{GraphqlSchema.id_from_object(payment)}",
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
