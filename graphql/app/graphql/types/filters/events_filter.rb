# frozen_string_literal: true

module Types
  module Filters
    class EventsFilter < BaseInputObject
      argument :start_date, DateTimeType, required: false
      argument :end_date,   DateTimeType, required: false
      argument :min_price,  Integer
      argument :max_price,  Integer
      argument :city,       String
      argument :tags,       [String], required: false
    end
  end
end
