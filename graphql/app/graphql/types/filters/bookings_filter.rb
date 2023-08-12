# frozen_string_literal: true

module Types
  module Filters
    class BookingsFilter < BaseInputObject
      argument :status, String, required: false
      argument :scheduled_for, Types::DateTimeType, required: false
      argument :event_id, ID, loads: Types::EventRelated::EventType, required: false
      argument :trip_id, [ID], loads: Types::TripRelated::TripType, required: false
    end
  end
end
