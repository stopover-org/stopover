# frozen_string_literal: true

module Types
  module SeoRelated
    class ArticleType < Types::ModelObject
      field :title, String, null: false
      field :content, String, null: false
      field :language, String, null: false
      field :image, String, null: false
      field :published_at, Types::DateTimeType, null: false
      field :interests, [Types::EventsRelated::InterestType], null: false

      def image
        object.image.url
      end

      def published_at
        object.created_at
      end
    end
  end
end
