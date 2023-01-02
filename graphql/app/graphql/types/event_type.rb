# frozen_string_literal: true

module Types
  class EventType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :status, String, null: false
    field :description, String, null: false
    field :event_type, Types::EventTypeEnum, null: false
    field :recurring_type, Types::RecurringTypeEnum
    field :organizer_price_per_uom_cents, Integer
    field :attendee_price_per_uom_cents, Integer, null: false
    field :requires_contract, Boolean
    field :requires_passport, Boolean
    field :requires_check_in, Boolean
    field :recurring_days_with_time, [String]
    field :single_days_with_time, [String]
    field :duration_time, String, null: false
    field :house_number, String
    field :street, String
    field :city, String
    field :country, String
    field :region, String
    field :full_address, String, null: false
    field :longitude, Float
    field :latitude, Float
    field :unit, Types::UnitType, null: false
    field :event_options, [Types::EventOptionType], null: false
    field :interests, [Types::InterestType], null: false
    field :achievements, [Types::AchievementType]
    field :available_dates, [Types::DateTimeType], null: false
    field :tags, [Types::TagType], null: false
    field :average_rating, Float
    field :ratings_count, Integer
    field :external_id, String
    field :landmarks, String
    field :prepaid_type, String
    field :prepaid_amount_cents, Integer, null: false
    field :requires_prepaid, Boolean, null: false
    field :schedules, [Types::ScheduleType], null: false

    field :images, [String], null: false

    def images
      object.images.map do |img|
        Rails.application.routes.url_helpers.rails_blob_url(img)
      end
    end
  end
end
