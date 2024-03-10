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

      # SEO RELATED
      field :seo_metadatum, Types::SeoRelated::SeoMetadatum

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
    end
  end
end
