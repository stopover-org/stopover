# frozen_string_literal: true

module Types
  module FirmsRelated
    class BalanceType < Types::ModelObject
      field :id, ID, null: false
      field :total_amount, Types::MoneyType, null: false
      field :last_payout_at, Types::MoneyType, null: false
      field :successful,    Types::MoneyType, null: false
      field :processing,    Types::MoneyType, null: false
      field :firm,          Types::FirmsRelated::FirmType, null: false
    end
  end
end
