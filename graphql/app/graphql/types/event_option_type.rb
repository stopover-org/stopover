# frozen_string_literal: true

module Types
  class EventOptionType < Types::ModelObject
    field :id, ID
    field :title, String
    field :organizer_cost_cents, Integer
    field :attendee_cost_cents, Integer
    field :built_in, Boolean
  end
end
