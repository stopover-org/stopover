# frozen_string_literal: true

module Types
  module FirmsRelated
    class BalanceType < Types::ModelObject
      field :id, ID, null: false
      field :total_amount, Types::MoneyType, null: false
      field :last_payout_at, Types::MoneyType, null: false
      field :successful_payments,    Types::MoneyType, null: false
      field :processing_payments,    Types::MoneyType, null: false
      field :firm,          Types::FirmsRelated::FirmType, null: false
      field :payouts,       [Types::PaymentsRelated::PayoutType], null: false
    end
  end
end
