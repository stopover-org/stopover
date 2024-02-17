# frozen_string_literal: true

module Types
  module BookingsRelated
    class AttendeeType < Types::ModelObject
      field :booking, Types::BookingsRelated::BookingType, null: false
      field :attendee_options, [Types::BookingsRelated::AttendeeOptionType], null: false
      field :event_options, [Types::EventsRelated::EventOptionType], null: false
      field :first_name, String
      field :last_name, String
      field :phone, String
      field :email, String
      field :full_name, String
      field :status, Types::Statuses::AttendeeStatusEnum, null: false
      field :place, [Integer]
    end
  end
end
