# frozen_string_literal: true

module Types
  class BookingsFilter < BaseInputObject
    argument :status, String, required: false
    argument :scheduled_for, Types::DateTimeType, required: false
    argument :event_id, ID, loads: Types::EventType, required: false
    argument :trip_id, [ID], loads: Types::TripType, required: false
  end
end
