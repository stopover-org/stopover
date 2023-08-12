# frozen_string_literal: true

module Types
  module BookingRelated
    class AttendeeOptionType < Types::ModelObject
      field :attendee_price, Types::MoneyType, null: false
      field :organizer_price, Types::MoneyType, null: false
      field :attendee, Types::BookingRelated::AttendeeType, null: false
      field :builtIn, Boolean, null: false
      field :event_option, Types::EventRelated::EventOptionType, null: false
      field :status, Types::Statuses::EventOptionStatusEnum, null: false
    end
  end
end
