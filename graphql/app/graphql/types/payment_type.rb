# frozen_string_literal: true

module Types
  class PaymentType < Types::ModelObject
    field :id, ID, null: false
    field :status, String
    field :total_price_cents, Decimal
    field :cancel_url, String
  end
end
