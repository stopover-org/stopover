# frozen_string_literal: true

module Types
  class EventType < Types::ModelObject
    field :id, ID, null: false
    field :title, String, null: false
    field :status, String, null: false
    field :description, String, null: false
    field :event_type, Types::EventTypeEnum, null: false
    field :recurring_type, Types::RecurringTypeEnum
    field :organizer_price_per_uom, Types::MoneyType
    field :attendee_price_per_uom, Types::MoneyType
    field :requires_contract, Boolean
    field :requires_passport, Boolean
    field :requires_check_in, Boolean
    field :recurring_days_with_time, [String], null: false
    field :single_days_with_time, [Types::DateTimeType], null: false
    field :duration_time, String, null: false
    field :house_number, String
    field :street, String
    field :city, String
    field :country, String
    field :region, String
    field :full_address, String
    field :longitude, Float
    field :latitude, Float
    field :unit, Types::UnitType
    field :event_options, [Types::EventOptionType], null: false
    field :interests, [Types::InterestType], null: false
    field :achievements, [Types::AchievementType], null: false
    field :available_dates, [Types::DateTimeType], null: false
    field :tags, [Types::TagType], null: false
    field :average_rating, Float, null: false
    field :ratings_count, Integer
    field :external_id, String
    field :landmarks, String
    field :prepaid_type, String
    field :prepaid_amount, Types::MoneyType, null: false
    field :requires_prepaid, Boolean, null: false
    field :schedules, [Types::ScheduleType], null: false
    field :booking_cancellation_options, [Types::BookingCancellationOptionType]
    field :images, [String], null: false
    field :my_bookings, [BookingType], null: false

    def images
      object.images.map do |img|
        Rails.application.routes.url_helpers.rails_blob_url(img)
      end
    end

    def my_bookings
      context[:current_user].account
                            .bookings
                            .joins(:schedule)
                            .where('schedules.scheduled_for > ? AND bookings.event_id = ?', Time.zone.now, object.id)
    end
  end
end
