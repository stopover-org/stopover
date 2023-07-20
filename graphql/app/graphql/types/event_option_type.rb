# frozen_string_literal: true

module Types
  class EventOptionType < Types::ModelObject
    field :attendee_price, Types::MoneyType, null: false
    field :built_in, Boolean, null: false
    field :description, String
    field :for_attendee, Boolean, null: false
    field :id, ID, null: false
    field :organizer_price, Types::MoneyType
    field :title, String, null: false
    field :status, Types::EventOptionStatusEnum, null: false
    field :event, Types::EventType, null: false
  end
end
