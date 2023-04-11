# frozen_string_literal: true

class StripeSupport
  def self.create_stripe_account(user)
    return if user.try(:firm)
    account = Stripe::Account.create({
                                       type: 'custom',
                             country: user.account.country,
                             email: user.email,
                             capabilities: {
                               card_payments: { requested: true },
                               transfers: { requested: true }
                             }
                                     })
    user.firm.update(stripe_account: account)

    account_link = Stripe::AccountLink.create({
                                                account: account.id,
                                     refresh_url: 'https://example.com/reauth',
                                     return_url: 'https://example.com/return',
                                     type: 'account_onboarding'
                                              })
    {
      account: account,
      account_link: account_link
    }
  rescue StandardError => e
    Rails.logger.debug 'something went wrong when creating account and account link in stripe'
    {
      account: nil,
      account_link: nil
    }
  end

  def self.generate_stripe_checkout_session(booking, payment_type)
    event_stripe_integration = booking.event.stripe_integrations.active.find_by(price_type: payment_type)

    payment = Payment.create!(booking: booking, payment_type: payment_type, balance: booking.event.firm.balance)

    payment.stripe_integrations << event_stripe_integration
    attendee_options = {}

    booking.attendees.map do |att|
      att.attendee_options.each do |att_opt|
        stripe_integration = att_opt.event_option.stripe_integrations.active.last
        if attendee_options[att_opt.event_option.id].nil?
          attendee_options[att_opt.event_option.id] = {
            price: stripe_integration.price_id,
            quantity: 0
          }
        end

        payment.stripe_integrations << stripe_integration

        attendee_options[att_opt.event_option.id][:quantity] += 1
      end
    end

    booking_options = booking.booking_options.map do |opt|
      stripe_integration = opt.event_option.stripe_integrations.active.last
      payment.stripe_integrations << stripe_integration

      {
        price: stripe_integration.price_id,
        quantity: 1
      }
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
