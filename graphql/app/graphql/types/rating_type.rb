# frozen_string_literal: true

module Types
  class RatingType < Types::ModelObject
    field :rating_value, Integer
    field :account, AccountType
    field :event, EventType
  end
end
