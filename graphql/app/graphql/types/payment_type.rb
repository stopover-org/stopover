# frozen_string_literal: true

module Types
  class PaymentType < Types::ModelObject
    field :id, ID, null: false
    field :status, String
    field :total_price, Types::MoneyType
    field :cancel_url, String
    field :updated_at, DateTimeType
  end
end
