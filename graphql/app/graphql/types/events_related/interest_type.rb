# frozen_string_literal: true

module Types
  module EventsRelated
    class InterestType < Types::ModelObject
      field :id, ID, null: false
      field :title, String, null: false
      field :slug, String, null: false
      field :preview, String
      field :original_title, String, null: false

      def original_title
        object.title
      end

      def title
        object.translate(:title)
      end

      def preview
        object.preview&.url
      end
    end
  end
end
