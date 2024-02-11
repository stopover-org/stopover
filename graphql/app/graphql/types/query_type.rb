# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :current_user, Types::UsersRelated::UserType, null: false

    field :interests, [Types::EventsRelated::InterestType], null: false

    field :events, Types::EventsRelated::EventType.connection_type, null: false do
      argument :filters, Types::Filters::EventsFilter, required: false
    end

    field :event_filters, Types::EventsRelated::EventFiltersType, null: false do
      argument :city, String, required: false
    end

    field :event, Types::EventsRelated::EventType do
      argument :id, ID, required: true, loads: Types::EventsRelated::EventType
    end

    field :firm, Types::FirmsRelated::FirmType do
      argument :id, ID, required: true, loads: Types::FirmsRelated::FirmType
    end

    field :booking, Types::BookingsRelated::BookingType do
      argument :id, ID, required: true, loads: Types::BookingsRelated::BookingType
    end

    field :trips, [Types::TripsRelated::TripType], null: false

    field :events_autocomplete, Types::EventsRelated::EventsAutocompleteType, null: false do
      argument :query, String, required: true
      argument :ids, [ID], loads: Types::EventsRelated::EventType, required: false
    end

    def events(**args)
      arguments = {
        query_type: ::EventsQuery,
        **(args[:filters] || {})
      }
      Connections::SearchkickConnection.new(arguments: arguments)
    end

    def firm(id:)
      id if id.active?
    end

    def events_autocomplete(**args)
      if args[:query].blank?
        return { bookings: [],
                 events: args[:ids] || [],
                 interests: [] }
      end

      { bookings: Booking.search(args[:query], where: { trip_id: current_user&.account&.trips&.ids }, limit: 5).to_a,
        events: Event.search(args[:query], where: { status: [:published] }, limit: 5).to_a,
        interests: Interest.search(args[:query], limit: 5).to_a }
    end

    def booking(id:)
      id if id.user == current_user
    end

    def current_user
      context[:current_user]
    end

    def event_filters(**args)
      ::EventFiltersQuery.new({ city: args[:city] }).filters
    end

    def interests(**_args)
      Interest.all
    end

    def event(id:)
      id if id.published?
    end

    def trips(**args)
      ::TripsQuery.new(args[:filters]&.to_h || {}, current_user).all
    end
  end
end
