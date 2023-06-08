# frozen_string_literal: true

module Types
  class BalanceType < Types::ModelObject
    field :id, ID, null: false
    field :total_amount, Types::MoneyType, null: false
    field :firm, Types::FirmType, null: false
  end
end
