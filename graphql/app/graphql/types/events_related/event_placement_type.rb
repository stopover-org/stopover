# frozen_string_literal: true

module Types
  module EventsRelated
    class EventPlacementType < Types::ModelObject
      field :title, String, null: false
      field :height_places, Integer, null: false
      field :width_places, Integer, null: false
      field :places, [Types::EventsRelated::EventPlacementPlaceType], null: false

      def places
        object.places.values
      end
    end
  end
end
