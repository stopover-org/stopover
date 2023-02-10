# frozen_string_literal: true

module Types
  class TripsFilter < BaseInputObject
    argument :booking_ids, [ID], loads: Types::BookingType, required: false
    argument :start_date, Types::DateTimeType, required: false
    argument :end_date, Types::DateTimeType, required: false
    argument :cities, [String], required: false
  end
end
