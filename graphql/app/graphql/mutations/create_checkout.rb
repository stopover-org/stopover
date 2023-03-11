# frozen_string_literal: true

module Mutations
  class CreatCheckout < BaseMutation
    argument :payment_type, String
    argument :booking, ID, loads: Types::BookingType, required: false
    def resolve(**args)
      return { url: nil } if Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value != true
      booking = args[:booking]
      event_stripe_integration = booking.event.stripe_integrations.where(price_type: args[:payment_type]).first
      event_options = booking.event_options
      # TODO: add attendee otions to checkout
      Stripe::Checkout::Session.create({
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
         success_url: 'http://localhost:3000/checkouts/success',
         cancel_url: 'http://localhost:3000/checkouts/success'
                                       })
    end
  end
end
