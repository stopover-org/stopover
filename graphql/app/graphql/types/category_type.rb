# frozen_string_literal: true

module Types
  class CategoryType < Types::BaseObject
    field :id, ID
    field :title, String
    field :preview, String
  end
end
