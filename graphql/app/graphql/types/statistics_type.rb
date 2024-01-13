# frozen_string_literal: true

module Types
  class StatisticsType < Types::BaseObject
    field :name, String, null: false
    field :value, Float, null: false
  end
end
