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

    field :events, Types::EventType.connection_type do
      argument :filters, Types::EventsFilter, required: false
    end

    field :event_filters, Types::EventFiltersType do
      argument :city, String, required: false
    end

    field :event, Types::EventType do
      argument :id, ID, required: true
    end

    def current_user
      context[:current_user]
    end

    def event_filters
      ::EventFiltersQuery.new(args[:city])
    end

    def interests(**args)
      ::InterestsQuery.new(args[:filters]&.to_h || {}, Interest.all, current_user).all
    end

    def events(**args)
      ::EventsQuery.new(args[:filters]&.to_h || {}, Event.events_between(Time.zone.now), current_user).all
    end

    def event(**args)
      Event.find(args[:id])
    end
  end
end
