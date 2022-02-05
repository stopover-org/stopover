# frozen_string_literal: true

module Types
  class TripOptionType < Types::BaseObject
    field :id, ID, required: false
    field :relay_id, ID, required: false
    field :title, String
    field :organizer_cost_cents, Integer
    field :attendee_cost_cents, Integer, required: false
    field :built_in, Boolean
  end
end
