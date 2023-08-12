# frozen_string_literal: true

module Types
  module BookingRelated
    class AttendeeType < Types::ModelObject
      field :booking, Types::BookingRelated::BookingType, null: false
      field :attendee_options, [Types::BookingRelated::AttendeeOptionType], null: false
      field :event_options, [Types::EventRelated::EventOptionType], null: false
      field :first_name, String
      field :last_name, String
      field :phone, String
      field :email, String
      field :full_name, String
      field :status, Types::Statuses::AttendeeStatusEnum, null: false
    end
  end
end
