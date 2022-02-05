# frozen_string_literal: true

module Types
  class CategoryType < Types::BaseObject
    field :relay_id, ID
    field :id, ID
    field :title, String
    field :preview, String
  end
end
