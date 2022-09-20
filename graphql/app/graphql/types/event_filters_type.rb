module Types
  class EventFiltersType < Types::BaseObject
    field :city, String
    field :start_date, DateTimeType
    field :end_date, DateTimeType
    field :min_price, Integer
    field :max_price, Integer
  end
end
