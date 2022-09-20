# frozen_string_literal: true

module Types
  class InterestType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :slug, String, null: false
    field :preview, String
  end
end
