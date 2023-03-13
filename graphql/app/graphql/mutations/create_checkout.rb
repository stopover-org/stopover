# frozen_string_literal: true

module Mutations
  class CreateCheckout < BaseMutation
    field :booking, Types::BookingType
    field :url, String

    argument :payment_type, String, required: false
    argument :booking_id, ID, loads: Types::BookingType, required: false

    def resolve(booking:, **args)
      return { url: nil } if ::Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value != 'true'
      event_stripe_integration = booking.event.stripe_integrations.where(price_type: args[:payment_type]).first
      event_options = booking.event_options
      # TODO: add attendee options to checkout

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
         success_url: 'http://localhost:3000/checkouts/success',
         cancel_url: 'http://localhost:3000/checkouts/success'
                                                  })

      {
        url: checkout[:url],
        booking: booking
      }
    rescue StandardError => e
      {
        url: nil,
        booking: nil,
        error: 'no stripe'
      }
    end
  end
end
