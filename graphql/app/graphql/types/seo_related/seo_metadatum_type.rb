# frozen_string_literal: true

module Types
  module SeoRelated
    class SeoMetadatum < Types::ModelObject
      field :title, String
      field :description, String
      field :keywords, String
    end
  end
end
