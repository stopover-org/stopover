# frozen_string_literal: true

module Types
  module EventsRelated
    class EventPlacementPlaceType < Types::BaseObject
      field :available, Boolean, null: false
      field :coordinates, [Integer], null: false
    end
  end
end
