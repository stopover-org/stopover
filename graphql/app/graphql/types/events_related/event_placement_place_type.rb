# frozen_string_literal: true

module Types
  module EventsRelated
    class EventPlacementPlaceType < Types::BaseObject
      field :available, Boolean
      field :coordinates, [Integer]
    end
  end
end
