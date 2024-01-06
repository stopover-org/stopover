# frozen_string_literal: true

module Types
  module Filters
    class BookingsFilter < BaseInputObject
      argument :contact_email,  String, required: false
      argument :contact_phone,  String, required: false
      argument :status,         String, required: false
      argument :booked_for,     Types::DateTimeType, required: false
      argument :event_id,       ID, loads: Types::EventsRelated::EventType, required: false
      argument :event_ids,      [ID], loads: Types::EventsRelated::EventType, required: false
      argument :trip_id,        [ID], loads: Types::TripsRelated::TripType, required: false
      argument :schedule_id,    [ID], loads: Types::EventsRelated::ScheduleType, required: false
    end
  end
end
