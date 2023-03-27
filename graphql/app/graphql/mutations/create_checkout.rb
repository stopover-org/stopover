# frozen_string_literal: true

module Mutations
  class CreateCheckout < BaseMutation
    field :booking, Types::BookingType
    field :url, String
    field :payment, Types::PaymentType

    argument :payment_type, String
    argument :booking_id, ID, loads: Types::BookingType

    def resolve(booking:, **args)
      return { url: nil } if ::Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value != 'true'

      raise GraphQL::ExecutionError, 'multiple payments in process' if booking.payments.processing.count > 1

      if booking.payments.processing.any?

        payment = booking.payments.processing.last
        checkout = Stripe::Checkout::Session.retrieve(payment.stripe_checkout_session_id)

        if checkout[:status] == 'expired'
          payment.cancel!
          checkout = ::StripeSupport.generate_stripe_checkout_session(booking, args[:payment_type])
          return {
            url: checkout[:url],
            booking: booking,
            payment: checkout[:payment]
          }
        else
          return {
            url: checkout[:url],
            booking: booking,
            payment: payment
          }
        end
      end
      checkout = ::StripeSupport.generate_stripe_checkout_session(booking, args[:payment_type])
      {
        url: checkout[:url],
        booking: booking,
        payment: checkout[:payment]
      }
    rescue StandardError => e
      {
        url: nil,
        booking: booking,
        payment: nil
      }
    end
  end
end
