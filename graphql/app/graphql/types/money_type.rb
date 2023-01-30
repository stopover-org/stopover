# frozen_string_literal: true

module Types
  class MoneyType < Types::BaseObject
    description 'represents money'

    field :cents, Integer, null: false
    field :currency, String, null: false

    delegate :cents, to: :object

    def currency
      object.currency.id
    end
  end
end
