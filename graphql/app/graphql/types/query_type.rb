# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :current_user, Types::UsersRelated::UserType

    field :interests, [Types::EventsRelated::InterestType] do
      argument :filters, Types::Filters::InterestsFilter, required: false
    end

    field :events, Types::EventsRelated::EventType.connection_type, null: false do
      argument :filters, Types::Filters::EventsFilter, required: false
    end

    field :schedules, Types::EventsRelated::ScheduleType.connection_type, null: false do
      argument :filters, Types::Filters::EventsFilter, required: false
    end

    field :event_filters, Types::EventsRelated::EventFiltersType, null: false do
      argument :city, String, required: false
    end

    field :event, Types::EventsRelated::EventType do
      argument :id, ID, required: true, loads: Types::EventsRelated::EventType
    end

    field :booking, Types::BookingsRelated::BookingType do
      argument :id, ID, required: true, loads: Types::BookingsRelated::BookingType
    end

    field :bookings, [Types::BookingsRelated::BookingType] do
      argument :filters, Types::Filters::BookingsFilter, required: false
    end

    field :trips, [Types::TripsRelated::TripType], null: false do
      argument :id, ID, required: true, loads: Types::BookingsRelated::BookingType
    end

    field :events_autocomplete, Types::EventsRelated::EventsAutocompleteType, null: false do
      argument :query, String, required: true
    end

    def events_autocomplete(**args)
      if !args[:query] || args[:query]&.empty?
        return { bookings: [],
                 events: [],
                 interests: [] }
      end

      { bookings: Booking.search(args[:query], limit: 5).to_a,
        events: Event.search(args[:query], limit: 5).to_a,
        interests: Interest.search(args[:query], limit: 5).to_a }
    end

    def bookings(**args)
      ::BookingQuery.new(args[:filters].to_h || {}, Booking.all, current_user).all
    end

    def booking(id:)
      id
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
      Connections::SearchkickConnection.new(arguments: { query_type: ::EventsQuery, **(args[:filters] || {}) })
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
