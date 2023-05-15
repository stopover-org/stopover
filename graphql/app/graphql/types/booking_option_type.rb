# frozen_string_literal: true

module Types
  class BookingOptionType < Types::ModelObject
    field :attendee_price, Types::MoneyType, null: false
    field :organizer_price, Types::MoneyType, null: false
    field :builtIn, Boolean, null: false
    field :booking, Types::BookingType, null: false
    field :event_option, Types::EventOptionType, null: false
  end
end
