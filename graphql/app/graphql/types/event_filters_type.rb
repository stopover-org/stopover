# frozen_string_literal: true

module Types
  class EventFiltersType < Types::BaseObject
    field :city, String
    field :start_date, DateTimeType
    field :end_date, DateTimeType
    field :min_price, Integer, null: false
    field :max_price, Integer, null: false
  end
end
