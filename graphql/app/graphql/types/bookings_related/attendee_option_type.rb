# frozen_string_literal: true

module Types
  module BookingsRelated
    class AttendeeOptionType < Types::ModelObject
      field :attendee_price,  Types::MoneyType, null: false
      field :organizer_price, Types::MoneyType, null: false
      field :attendee,        Types::BookingsRelated::AttendeeType, null: false
      field :builtIn,         Boolean, null: false
      field :event_option,    Types::EventsRelated::EventOptionType, null: false
      field :status,          Types::Statuses::EventOptionStatusEnum, null: false
    end
  end
end
