# frozen_string_literal: true

module Types
  class MoneyType < Types::BaseObject
    description 'represents money'

    field :cents, Integer, null: false
    field :currency, CurrencyType, null: false

    delegate :cents, to: :object

    delegate :currency, to: :object
  end
end
