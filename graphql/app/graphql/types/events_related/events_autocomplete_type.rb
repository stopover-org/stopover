# frozen_string_literal: true

module Types
  module EventsRelated
    class EventsAutocompleteType < Types::BaseObject
      field :events,    [Types::EventsRelated::EventType],      null: false
      field :bookings,  [Types::BookingsRelated::BookingType],  null: false
      field :interests, [Types::EventsRelated::InterestType],   null: false
    end
  end
end
