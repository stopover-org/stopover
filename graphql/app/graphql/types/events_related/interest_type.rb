# frozen_string_literal: true

module Types
  module EventsRelated
    class InterestType < Types::ModelObject
      field :id, ID, null: false
      field :title, String, null: false
      field :source_title, String, null: false
      field :slug, String, null: false
      field :preview, String

      def title
        object.translate(:title)
      end

      def source_title
        object.title
      end

      def preview
        object.preview&.url
      end
    end
  end
end
