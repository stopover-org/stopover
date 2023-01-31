# frozen_string_literal: true

module Types
  class CurrencyType < Types::BaseObject
    field :name, String, null: false
    field :symbol, String, null: false
    field :full_name, String, null: false

    def name
      object.id
    end

    delegate :symbol, to: :object

    def full_name
      object.name
    end
  end
end
