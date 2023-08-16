# frozen_string_literal: true

module Types
  module EventsRelated
    class EventFiltersType < Types::BaseObject
      field :city,        String
      field :start_date,  Types::DateTimeType
      field :end_date,    Types::DateTimeType
      field :min_price,   Types::MoneyType, null: false
      field :max_price,   Types::MoneyType, null: false
    end
  end
end
