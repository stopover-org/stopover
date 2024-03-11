# frozen_string_literal: true

module Types
  module SeoRelated
    class SeoMetadatumType < Types::ModelObject
      field :title, String, null: false
      field :description, String, null: false
      field :keywords, String, null: false
      field :language, String, null: false
    end
  end
end
