# frozen_string_literal: true

module Types
  class AttendeeType < Types::ModelObject
    field :booking, Types::BookingType, null: false
    field :event_options, [Types::EventOptionType], null: false
    field :first_name, String
    field :last_name, String
    field :phone, String
    field :email, String
    field :full_name, String
    field :is_registered, Boolean
  end
end
