# frozen_string_literal: true

module Types
  module TripsRelated
    class TourPlaceType < Types::ModelObject
      field :title, String, null: false
      field :description, String
      field :image, String
      field :duration_time, String

      def image
        object.image&.url
      end

      def title
        if current_firm == object.firm
          object.title
        else
          object.translate(:title)
        end
      end

      def description
        if current_firm == object.firm
          object.description
        else
          object.translate(:description)
        end
      end
    end
  end
end
