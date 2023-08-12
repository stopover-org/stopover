# frozen_string_literal: true

module Types
  module Filters
    class TripsFilter < BaseInputObject
      argument :bookings, [ID], loads: Types::BookingRelated::BookingType, required: false
      argument :start_date, Types::DateTimeType, required: false
      argument :end_date, Types::DateTimeType, required: false
      # TODO: add duration argument
      # figure out how to check duration:
      # min date - max date
      # in seconds (10000 seconds)
      # in string (1d, 1m, 1d 1h)
    end
  end
end
