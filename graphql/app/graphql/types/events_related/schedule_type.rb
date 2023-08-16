# frozen_string_literal: true

module Types
  module EventsRelated
    class ScheduleType < Types::ModelObject
      field :id,            ID, null: false
      field :scheduled_for, Types::DateTimeType, null: false
      field :status,        String, null: false
      field :event,         Types::EventsRelated::EventType, null: false
      field :bookings,      [Types::BookingsRelated::BookingType], null: false, require_manager: true
    end
  end
end
