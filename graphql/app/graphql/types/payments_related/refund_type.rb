# frozen_string_literal: true

module Types
  module PaymentsRelated
    class RefundType < Types::ModelObject
      field :id,          ID, null: false
      field :status,      String, null: false
      field :total_amount, Types::MoneyType, null: false
      field :penalty_amount, Types::MoneyType, null: false
      field :updated_at,  DateTimeType, null: false
      field :created_at,  DateTimeType, null: false
      field :booking,     Types::BookingsRelated::BookingType, null: false
    end
  end
end
