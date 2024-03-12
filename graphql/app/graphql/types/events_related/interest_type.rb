# frozen_string_literal: true

module Types
  module EventsRelated
    class InterestType < Types::ModelObject
      field :id, ID, null: false
      field :title, String, null: false
      field :slug, String, null: false
      field :preview, String
      field :original_title, String, null: false
      field :description, String, null: false
      field :original_description, String, null: false
      field :articles, Types::SeoRelated::ArticleType.connection_type, null: false

      # SEO RELATED
      field :seo_metadatum, Types::SeoRelated::SeoMetadatumType

      def original_title
        object.title
      end

      def title
        object.translate(:title)
      end

      def original_description
        object.description
      end

      def description
        object.translate(:description)
      end

      def preview
        object.preview&.url
      end

      def articles
        object.articles.order(created_at: :desc)
      end
    end
  end
end
