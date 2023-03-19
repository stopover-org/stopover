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

      raise GraphQL::ExecutionError, 'payment in progress' if booking.payments.where(booking: booking, status: 'processing').any?
      checkout = ::Configuration.generate_stripe_checkout_session(booking, args[:payment_type])

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
