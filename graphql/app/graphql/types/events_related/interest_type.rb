# frozen_string_literal: true

module Types
  module EventsRelated
    class InterestType < Types::ModelObject
      field :id,    ID, null: false
      field :title, String, null: false
      field :slug,  String, null: false
      field :preview, String
      field :link,    String

      def title
        object.translate(:title)
      end

      def description
        object.translate(:description)
      end

      def link
        "/events?interests=#{object.slug}"
      end

      def preview
        object.preview&.url
      end
    end
  end
end
