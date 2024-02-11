# frozen_string_literal: true

module Types
  module Filters
    class EventsFilter < BaseInputObject
      argument :start_date, DateTimeType, required: false
      argument :end_date, DateTimeType, required: false
      argument :min_price, Integer, required: false
      argument :max_price, Integer, required: false
      argument :city, String, required: false
      argument :query, String, required: false
      argument :interests, [String], required: false
      argument :firm_id, ID, loads: Types::FirmsRelated::FirmType, required: false
    end
  end
end
