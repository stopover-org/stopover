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
    end
  end
end
