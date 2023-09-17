# frozen_string_literal: true

module Types
  module PaymentsRelated
    class PayoutType < Types::ModelObject
      field :id,          ID, null: false
      field :status,      String, null: false
      field :total_amount, Types::MoneyType, null: false
      field :updated_at,  DateTimeType, null: false
      field :created_at,  DateTimeType, null: false
    end
  end
end
