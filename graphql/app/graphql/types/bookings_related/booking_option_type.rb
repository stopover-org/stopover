# frozen_string_literal: true

module Types
  module BookingsRelated
    class BookingOptionType < Types::ModelObject
      field :attendee_price,  Types::MoneyType, null: false
      field :organizer_price, Types::MoneyType, null: false
      field :builtIn,         Boolean, null: false
      field :booking,         Types::BookingsRelated::BookingType, null: false
      field :event_option,    Types::EventsRelated::EventOptionType, null: false
      field :status,          Types::Statuses::EventOptionStatusEnum, null: false
    end
  end
end
