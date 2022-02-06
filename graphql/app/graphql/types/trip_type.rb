# frozen_string_literal: true

module Types
  class TripType < Types::ModelObject
    field :id, ID
    field :title, String
    field :description, String
    field :trip_type, Types::TripTypeEnum
    field :recurring_type, Types::RecurringTypeEnum
    field :organizer_cost_per_uom_cents, Integer
    field :attendee_cost_per_uom_cents, Integer
    field :requires_contract, Boolean
    field :requires_passport, Boolean
    field :requires_check_in, Boolean
    field :recurring_days_with_time, [String]
    field :single_days_with_time, [String]
    field :duration_time, String
    field :house_number, String
    field :street, String
    field :city, String
    field :country, String
    field :region, String
    field :full_address, String
    field :longitude, Float
    field :latitude, Float
    field :unit, Types::UnitType
    field :trip_options, [Types::TripOptionType]
    field :categories, [Types::CategoryType]
    field :achievements, [Types::AchievementType]
  end
end
