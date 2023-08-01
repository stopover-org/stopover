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

    field :events, Types::EventType.connection_type, null: false do
      argument :filters, Types::EventsFilter, required: false
    end

    field :schedules, Types::ScheduleType.connection_type, null: false do
      argument :filters, Types::EventsFilter, required: false
    end

    field :event_filters, Types::EventFiltersType, null: false do
      argument :city, String, required: false
    end

    field :event, Types::EventType do
      argument :id, ID, required: true, loads: Types::EventType
    end

    field :bookings, [Types::BookingType] do
      argument :filters, Types::BookingsFilter, required: false
    end

    field :trips, [Types::TripType] do
      argument :filters, Types::TripsFilter, required: false
    end

    def bookings(**args)
      ::BookingQuery.new(args[:filters].to_h || {}, Booking.all, current_user).all
    end

    def current_user
      context[:current_user]
    end

    def event_filters(**args)
      ::EventFiltersQuery.new({ city: args[:city] }).filters
    end

    def interests(**args)
      ::InterestsQuery.new(args[:filters].to_h || {}, Interest.all, current_user).all
    end

    def events(**args)
      ::EventsQuery.new(args[:filters].to_h || {}).all
    end

    def schedules(**args)
      ::SchedulesQuery.new(args[:filters].to_h || {}).all
    end

    def event(id:)
      id
    end

    def trips(**args)
      ::TripsQuery.new(args[:filters]&.to_h || {}, Trip.all, current_user).all
    end
  end
end
