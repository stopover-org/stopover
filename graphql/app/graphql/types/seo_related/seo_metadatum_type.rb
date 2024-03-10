# frozen_string_literal: true

module Types
  module SeoRelated
    class SeoMetadatumType < Types::ModelObject
      field :title, String
      field :description, String
      field :keywords, String
      field :language, String
    end
  end
end
