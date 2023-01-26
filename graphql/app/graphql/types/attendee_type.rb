# frozen_string_literal: true

module Types
  class AttendeeType < Types::ModelObject
    field :booking, Types::BookingType
    field :event_option, Types::EventOptionType
    field :first_name, String
    field :last_name, String
    field :phone, String
    field :email, String
    field :full_name, String
  end
end
