# frozen_string_literal: true

module Types
  class AttendeesFilter < BaseInputObject
    argument :email, String, required: false
    argument :phone, String, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :booking_id, ID, loads: Types::BookingType, required: false
    argument :event_id, ID, loads: Types::EventType, required: false
    argument :is_registered, Boolean, required: false
  end
end
