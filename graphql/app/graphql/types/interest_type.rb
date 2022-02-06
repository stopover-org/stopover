# frozen_string_literal: true

module Types
  class InterestType < Types::ModelObject
    field :id, ID
    field :title, String
    field :slug, String
    field :preview, String
  end
end
