# frozen_string_literal: true

module Types
  module PaymentRelated
    class PaymentTypesEnum < Types::BaseEnum
      value 'full_amount', 'Full amount'
      value 'deposit', 'Deposit only'
    end
  end
end
