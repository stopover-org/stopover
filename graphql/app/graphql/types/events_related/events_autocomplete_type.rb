# frozen_string_literal: true

module Types
  module EventsRelated
    class EventsAutocompleteType < Types::BaseObject
      field :events, Types::EventsRelated::EventType
      field :bookings, Types::BookingsRelated::BookingType
      field :interests, Types::EventsRelated::InterestType
    end
  end
end
