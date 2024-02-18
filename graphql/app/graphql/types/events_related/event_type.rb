# frozen_string_literal: true

module Types
  module EventsRelated
    class EventType < Types::ModelObject
      include ::EventPolicy

      field :attendee_price_per_uom, Types::MoneyType
      field :available_dates, [Types::DateTimeType], null: false
      field :average_rating, Float, null: false
      field :booking_cancellation_options, [Types::EventsRelated::BookingCancellationOptionType], null: false
      field :description, String, null: false
      field :duration_time, String, null: false
      field :event_options, [Types::EventsRelated::EventOptionType], null: false
      field :event_type, Types::EventsRelated::EventTypeEnum, null: false
      field :external_id, String
      field :firm, Types::FirmsRelated::FirmType, null: false
      field :id, ID, null: false
      field :images, [String], null: false
      field :interests, [Types::EventsRelated::InterestType], null: false
      field :landmarks, String
      field :max_attendees, Integer
      field :min_attendees, Integer
      # TODO: change my bookings to the connection type
      field :my_bookings, [Types::BookingsRelated::BookingType], null: false
      field :organizer_price_per_uom, Types::MoneyType
      field :deposit_amount, Types::MoneyType, null: false
      field :ratings_count, Integer
      field :recurring_days_with_time, [String], null: false
      field :requires_check_in, Boolean, null: false
      field :requires_contract, Boolean, null: false
      field :requires_passport, Boolean, null: false
      field :requires_deposit, Boolean, null: false

      field :single_days_with_time, [Types::DateTimeType], null: false
      field :status, String, null: false
      field :title, String, null: false
      field :end_date, Types::DateTimeType
      field :stripe_integrations, Types::EventsRelated::StripeIntegrationType.connection_type, null: false
      field :statistics, [Types::StatisticsType], null: false
      field :address, Types::FirmsRelated::AddressType
      field :tour_plans, [Types::TripsRelated::TourPlanType]
      field :tour_plan, Types::TripsRelated::TourPlanType

      field :bookings, Types::BookingsRelated::BookingType.connection_type do
        argument :filters, Types::Filters::BookingsFilter, required: false
      end

      field :schedules, Types::EventsRelated::ScheduleType.connection_type, null: false do
        argument :filters, Types::Filters::SchedulesFilter, required: false
      end

      field :event_placements, [Types::EventsRelated::EventPlacementType], null: false
    end
  end
end
