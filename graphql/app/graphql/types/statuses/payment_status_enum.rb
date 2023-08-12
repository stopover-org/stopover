# frozen_string_literal: true

module Types
  module Statuses
    class PaymentStatusEnum < Types::BaseEnum
      value 'pending', 'initial'
      value 'processing', ''
      value 'cancelled', ''
      value 'successful', ''
    end
  end
end
