# frozen_string_literal: true

module Types
  module EventsRelated
    class InterestType < Types::ModelObject
      field :id,    ID, null: false
      field :title, String, null: false
      field :slug,  String, null: false
      field :preview, String
      field :link,    String

      def link
        "/interests/#{object.id}"
      end

      def preview
        Rails.application.routes.url_helpers.rails_blob_url(object.preview)
      end
    end
  end
end
