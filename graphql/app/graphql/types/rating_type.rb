# frozen_string_literal: true

module Types
  class RatingType < Types::ModelObject
    field :rating_value, Integer
    field :account, Types::UsersRelated::AccountType
    field :event, Types::EventsRelated::EventType
  end
end
