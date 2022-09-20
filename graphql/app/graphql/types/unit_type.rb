# frozen_string_literal: true

module Types
  class UnitType < Types::ModelObject
    field :id, ID, null: false
    field :name, String, null: false
    field :unit_type, String, null: false
    field :preview, String
  end
end
