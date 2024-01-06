# frozen_string_literal: true

module Types
  module EventsRelated
    class EventType < Types::ModelObject
      field :achievements,            [Types::FirmsRelated::AchievementType], null: false
      field :attendee_price_per_uom,  Types::MoneyType
      field :available_dates,         [Types::DateTimeType], null: false
      field :average_rating,          Float, null: false
      field :bookings,                Types::BookingsRelated::BookingType.connection_type, null: false, require_manager: true do
        argument :filters, Types::Filters::BookingsFilter, required: false
      end
      field :booking_cancellation_options, [Types::EventsRelated::BookingCancellationOptionType], null: false
      field :city,          String
      field :country,       String
      field :description,   String, null: false
      field :duration_time, String, null: false
      field :event_options, [Types::EventsRelated::EventOptionType], null: false
      field :event_type,    Types::EventsRelated::EventTypeEnum, null: false
      field :external_id,   String, require_manager: true
      field :firm,          Types::FirmsRelated::FirmType, null: false
      field :full_address,  String
      field :house_number,  String
      field :id,            ID, null: false
      field :images,        [String], null: false
      field :interests,     [Types::EventsRelated::InterestType], null: false
      field :landmarks,     String
      field :latitude,      Float
      field :longitude,     Float
      field :max_attendees, Integer
      field :min_attendees, Integer
      field :my_bookings,   [Types::BookingsRelated::BookingType], null: false
      field :organizer_price_per_uom, Types::MoneyType
      field :deposit_amount,  Types::MoneyType, null: false
      field :ratings_count,   Integer
      field :recurring_days_with_time, [String], null: false
      field :region,            String
      field :requires_check_in, Boolean, null: false
      field :requires_contract, Boolean, null: false
      field :requires_passport, Boolean, null: false
      field :requires_deposit,  Boolean, null: false

      field :schedules, Types::EventsRelated::ScheduleType.connection_type, null: false, require_manager: true do
        argument :filters, Types::Filters::SchedulesFilter, required: false
      end

      field :single_days_with_time, [Types::DateTimeType], null: false
      field :status,    String, null: false
      field :street,    String
      field :tags,      [Types::TagType], null: false
      field :title,     String, null: false
      field :unit,      Types::EventsRelated::UnitType
      field :end_date,  Types::DateTimeType
      field :stripe_integrations, Types::EventsRelated::StripeIntegrationType.connection_type, null: false, require_service_user: true
      field :statistics, [Types::StatisticsType], null: false

      def statistics
        [{ name: :bookings,
           value: object.bookings.count },
         { name: :paid,
           value: object.bookings.where(bookings: { status: :paid }).count }]
      end

      def title
        if current_firm == object.firm
          object.title
        else
          object.translate(:title)
        end
      end

      def description
        if current_firm == object.firm
          object.description
        else
          object.translate(:description)
        end
      end

      def duration_time
        if current_firm == object.firm
          object.duration_time
        else
          object.translate(:duration_time)
        end
      end

      def images
        object.images.map do |img|
          img&.url
        end
      end

      def bookings(**args)
        arguments = {
          query_type: ::BookingQuery,
          **(args[:filters] || {}),
          event_id: object.id
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def schedules(**args)
        arguments = {
          query_type: ::SchedulesQuery,
          **(args[:filters] || {}),
          event_id: object.id
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def my_bookings
        return [] unless context[:current_user]
        context[:current_user].account
                              .bookings
                              .where.not(status: :cancelled)
                              .joins(:schedule)
                              .where('schedules.scheduled_for > ? AND bookings.event_id = ?', Time.zone.now, object.id)
                              .where(schedules: { status: :active })
      end

      def booking(**args)
        return nil if context[:current_user].account.current_firm.events.id != args[:id].event_id
        args[:id]
      end

      def stripe_integrations
        integrations = object.stripe_integrations.to_a
        object.event_options.each do |opt|
          integrations.concat opt.stripe_integrations
        end

        integrations
      end
    end
  end
end
