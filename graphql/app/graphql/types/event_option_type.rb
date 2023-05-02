# frozen_string_literal: true

module Types
  class EventOptionType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :organizer_price, Types::MoneyType
    field :attendee_price, Types::MoneyType, null: false
    field :built_in, Boolean, null: false
  end
end
