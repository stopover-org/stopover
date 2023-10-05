# frozen_string_literal: true

module Types
  module FirmsRelated
    class FirmType < Types::ModelObject
      field :id, ID, null: false
      field :city,            String
      field :contact_person,  String
      field :contacts,        String
      field :country,         String
      field :description,     String
      field :full_address,    String
      field :house_number,    String
      field :latitude,        Float
      field :longitude,       Float
      field :primary_email,   String, null: false
      field :primary_phone,   String
      field :region,          String
      field :status,          String
      field :street,          String
      field :title,           String, null: false
      field :website,         String
      field :image,           String
      field :payment_types,   [String], null: false

      field :balance,   Types::FirmsRelated::BalanceType
      field :payments,  Types::PaymentsRelated::PaymentType.connection_type, null: false
      field :bookings,  Types::BookingsRelated::BookingType.connection_type, null: false
      field :schedules, Types::EventsRelated::ScheduleType.connection_type, null: false
      field :events,    Types::EventsRelated::EventType.connection_type, null: false

      field :stripe_connects, [Types::FirmsRelated::StripeConnectType], null: false, require_manager: true
      field :margin,          Integer, null: false, require_service_user: true

      field :accounts,  [Types::UsersRelated::AccountType]
      field :event,     Types::EventsRelated::EventType do
        argument :id, ID, required: true, loads: Types::EventsRelated::EventType
      end
      field :booking, Types::BookingsRelated::BookingType do
        argument :id, ID, required: true, loads: Types::BookingsRelated::BookingType
      end

      def image
        object.image_url
      end

      def booking(**args)
        args[:id]
      end

      def event(**args)
        args[:id]
      end
    end
  end
end
