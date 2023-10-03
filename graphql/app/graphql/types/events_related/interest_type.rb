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
        "/events?interests[]=#{object.slug}"
      end

      def preview
        Rails.application.routes.url_helpers.rails_blob_url(object.preview) if object.preview.present?
      end
    end
  end
end
