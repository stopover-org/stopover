# frozen_string_literal: true

module Types
  class AttendeeOptionType < Types::ModelObject
    field :attendee_price_cents, Integer
    field :organizer_price_cents, Integer
    field :attendee_id, Types::AttendeeType
    field :event_option_id, Types::EventOptionType
  end
end
