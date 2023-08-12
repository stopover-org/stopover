# frozen_string_literal: true

module Types
  module EventRelated
    class ScheduleType < Types::ModelObject
      field :id, ID, null: false
      field :scheduled_for, Types::DateTimeType, null: false
      field :status, String, null: false
      field :event, Types::EventRelated::EventType, null: false
      field :bookings, [Types::BookingRelated::BookingType], null: false, require_manager: true
    end
  end
end
