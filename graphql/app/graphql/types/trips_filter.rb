# frozen_string_literal: true

module Types
  class TripsFilter < BaseInputObject
    argument :bookings, [Types::BookingType]
    argument :min_date, Types::DateTimeType
    argument :max_date, Types::DateTimeType
    argument :cities, [String]
  end
end
