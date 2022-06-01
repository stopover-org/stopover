# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :current_user, Types::UserType

    field :interests, [Types::InterestType] do
      argument :filters, Types::InterestsFilter, required: false
    end

    field :events, [Types::EventType] do
      argument :id, Integer, required: false
    end

    def current_user
      context[:current_user]
    end

    def interests(**args)
      ::InterestsQuery.new(args[:filters]&.to_h || {}, Interest.all, current_user).all
    end

    def events(**args)
      ::EventsQuery.new(args[:filters]&.to_h || {}, Event.all, current_user).all
    end
  end
end
