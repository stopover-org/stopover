# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :current_user, Types::AccountRelated::UserType

    field :interests, [Types::EventRelated::InterestType] do
      argument :filters, Types::Filters::InterestsFilter, required: false
    end

    field :events, Types::EventRelated::EventType.connection_type, null: false do
      argument :filters, Types::Filters::EventsFilter, required: false
    end

    field :schedules, Types::EventRelated::ScheduleType.connection_type, null: false do
      argument :filters, Types::Filters::EventsFilter, required: false
    end

    field :event_filters, Types::Filters::EventFiltersType, null: false do
      argument :city, String, required: false
    end

    field :event, Types::EventRelated::EventType do
      argument :id, ID, required: true, loads: Types::EventRelated::EventType
    end

    field :bookings, [Types::BookingRelated::BookingType] do
      argument :filters, Types::Filters::BookingsFilter, required: false
    end

    field :trips, [Types::TripRelated::TripType] do
      argument :filters, Types::Filters::TripsFilter, required: false
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
