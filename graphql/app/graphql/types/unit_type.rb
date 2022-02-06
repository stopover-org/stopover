# frozen_string_literal: true

module Types
  class UnitType < Types::ModelObject
    field :id, ID
    field :name, String
    field :unit_type, String
    field :preview, required: false
  end
end
