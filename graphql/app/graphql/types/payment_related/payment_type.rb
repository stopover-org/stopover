# frozen_string_literal: true

module Types
  module PaymentRelated
    class PaymentType < Types::ModelObject
      field :id, ID, null: false
      field :status, String, null: false
      field :total_price, Types::MoneyType, null: false
      field :updated_at, DateTimeType, null: false
      field :created_at, DateTimeType, null: false
      field :booking, Types::BookingRelated::BookingType, null: false
    end
  end
end