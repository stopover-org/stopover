# frozen_string_literal: true

module Types
  class AttendeeOptionType < Types::ModelObject
    field :attendee_price, Types::MoneyType
    field :organizer_price, Types::MoneyType
    field :attendee_id, Types::AttendeeType
    field :event_option_id, Types::EventOptionType
  end
end
