# frozen_string_literal: true

module Types
  class TripType < Types::ModelObject
    field :bookings, [Types::BookingType]
    field :min_date, Types::DateTimeType
    field :max_date, Types::DateTimeType
    field :cities, [String]
  end
end