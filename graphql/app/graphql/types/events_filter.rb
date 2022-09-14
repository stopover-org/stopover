# frozen_string_literal: true

module Types
  class EventsFilter < BaseInputObject
    argument :start_date, DateTimeType
    argument :end_date, DateTimeType
    argument :min_price, Integer
    argument :max_price, Integer
    argument :city, String
  end
end
