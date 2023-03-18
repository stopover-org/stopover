# frozen_string_literal: true

module Mutations
  class SuccessfulPayment < BaseMutation
    field :payment, Types::PaymentType

    argument :payment_id, ID, loads: Types::PaymentType, required: false
    def resolve(payment:, **_args)
      payment.success!
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
