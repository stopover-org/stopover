# frozen_string_literal: true

module Types
  module TripsRelated
    class TourPlanType < Types::ModelObject
      field :title, String, null: false
      field :description, String
      field :image, String
      field :tour_places, [Types::TripsRelated::TourPlaceType]

      def image
        object.image&.url
      end
    end
  end
end
