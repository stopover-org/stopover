# frozen_string_literal: true

module Types
  class EventOptionType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :organizer_cost_cents, Integer
    field :attendee_cost_cents, Integer, null: false
    field :built_in, Boolean
  end
end
