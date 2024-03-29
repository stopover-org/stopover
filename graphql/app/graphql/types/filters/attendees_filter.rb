# frozen_string_literal: true

module Types
  module Filters
    class AttendeesFilter < BaseInputObject
      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType, required: false
      argument :event_id, ID, loads: Types::EventsRelated::EventType, required: false
      argument :status, [Types::Statuses::AttendeeStatusEnum], required: false
    end
  end
end
