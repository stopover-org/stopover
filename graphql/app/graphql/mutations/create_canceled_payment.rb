# frozen_string_literal: true

module Mutations
  class CreateCanceledPayment < BaseMutation
    field :payment, Types::PaymentType

    argument :payment_id, ID, loads: Types::PaymentType, required: false
    def resolve(payment:, **_args)
      payment.cancel!
      {
        payment: payment
      }
    rescue StandardError => e
      {
        payment: nil
      }
    end
  end
end
