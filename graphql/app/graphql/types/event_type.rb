# frozen_string_literal: true

module Types
  class EventType < Types::ModelObject
    field :achievements, [Types::AchievementType], null: false
    field :attendee_price_per_uom, Types::MoneyType
    field :available_dates, [Types::DateTimeType], null: false
    field :average_rating, Float, null: false
    field :booking_cancellation_options, [Types::BookingCancellationOptionType]
    field :city, String
    field :country, String
    field :description, String, null: false
    field :duration_time, String, null: false
    field :event_options, [Types::EventOptionType], null: false
    field :event_type, Types::EventTypeEnum, null: false
    field :external_id, String
    field :full_address, String
    field :house_number, String
    field :id, ID, null: false
    field :images, [String], null: false
    field :interests, [Types::InterestType], null: false
    field :landmarks, String
    field :latitude, Float
    field :longitude, Float
    field :max_attendees, Integer
    field :min_attendees, Integer
    field :my_bookings, [BookingType], null: false
    field :organizer_price_per_uom, Types::MoneyType
    field :prepaid_amount, Types::MoneyType, null: false
    field :prepaid_type, String
    field :ratings_count, Integer
    field :recurring_days_with_time, [String], null: false
    field :region, String
    field :requires_check_in, Boolean
    field :requires_contract, Boolean
    field :requires_passport, Boolean
    field :requires_prepaid, Boolean, null: false
    field :schedules, Types::ScheduleType.connection_type, null: false
    field :single_days_with_time, [Types::DateTimeType], null: false
    field :status, String, null: false
    field :street, String
    field :tags, [Types::TagType], null: false
    field :title, String, null: false
    field :unit, Types::UnitType

    def images
      object.images.map do |img|
        Rails.application.routes.url_helpers.rails_blob_url(img)
      end
    end

    def my_bookings
      return [] unless context[:current_user]
      context[:current_user].account
                            .bookings
                            .joins(:schedule)
                            .where('schedules.scheduled_for > ? AND bookings.event_id = ?', Time.zone.now, object.id)
    end
  end
end
