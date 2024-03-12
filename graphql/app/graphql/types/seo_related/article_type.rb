# frozen_string_literal: true

module Types
  module SeoRelated
    class ArticleType < Types::ModelObject
      field :title, String, null: false
      field :content, String, null: false
      field :language, String, null: false
    end
  end
end
