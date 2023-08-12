# frozen_string_literal: true

module Types
  class AttendeeOptionType < Types::ModelObject
    field :attendee_price, Types::MoneyType, null: false
    field :organizer_price, Types::MoneyType, null: false
    field :attendee, Types::AttendeeType, null: false
    field :builtIn, Boolean, null: false
    field :event_option, Types::EventOptionType, null: false
    field :status, Types::Statuses::EventOptionStatusEnum, null: false
  end
end
