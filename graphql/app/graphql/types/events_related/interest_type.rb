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
        if current_firm == object.firm
          object.title
        else
          object.translate(:title)
        end
      end

      def description
        if current_firm == object.firm
          object.title
        else
          object.translate(:description)
        end
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
