# frozen_string_literal: true

module Types
  module FirmsRelated
    class BalanceType < Types::ModelObject
      field :id, ID, null: false
      field :total_amount,  Types::MoneyType, null: false
      field :to_withdraw,   Types::MoneyType, null: false
      field :successful,    Types::MoneyType, null: false
      field :processing,    Types::MoneyType, null: false
      field :withdrawn,     Types::MoneyType, null: false
      field :withdrawn_at,  Types::DateTimeType
      field :firm,          Types::FirmsRelated::FirmType, null: false
    end
  end
end
