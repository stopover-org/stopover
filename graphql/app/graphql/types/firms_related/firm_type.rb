# frozen_string_literal: true

module Types
  module FirmsRelated
    class FirmType < Types::ModelObject
      include ::FirmPolicy

      field :id, ID, null: false
      field :contact_person, String
      field :contacts, String
      field :description, String
      field :primary_email, String
      field :primary_phone, String
      field :status, String, null: false
      field :title, String, null: false
      field :website, String
      field :image, String
      field :payment_types, [String], null: false
      field :address, Types::FirmsRelated::AddressType
      field :contract_address, String # Crypto Wallet address

      field :balance, Types::FirmsRelated::BalanceType

      field :payments, Types::PaymentsRelated::PaymentType.connection_type

      field :payment, Types::PaymentsRelated::PaymentType do
        argument :id, ID, required: true, loads: Types::PaymentsRelated::PaymentType
      end

      field :bookings, Types::BookingsRelated::BookingType.connection_type do
        argument :filters, Types::Filters::BookingsFilter, required: false
      end

      field :booking, Types::BookingsRelated::BookingType do
        argument :id, ID, required: true, loads: Types::BookingsRelated::BookingType
      end

      field :schedules, Types::EventsRelated::ScheduleType.connection_type do
        argument :filters, Types::Filters::SchedulesFilter, required: false
      end

      field :schedule, Types::EventsRelated::ScheduleType do
        argument :id, ID, required: true, loads: Types::EventsRelated::ScheduleType
      end

      field :events, Types::EventsRelated::EventType.connection_type, null: false do
        argument :filters, Types::Filters::EventsFilter, required: false
        argument :backend, Boolean, required: false
      end

      field :stripe_connects, [Types::FirmsRelated::StripeConnectType]

      field :margin, Integer

      field :accounts, [Types::UsersRelated::AccountType]

      field :event, Types::EventsRelated::EventType do
        argument :id, ID, required: true, loads: Types::EventsRelated::EventType
      end

      field :events_autocomplete, Types::EventsRelated::EventsAutocompleteType, null: false do
        argument :query, String, required: true
        argument :ids, [ID], loads: Types::EventsRelated::EventType, required: false
      end
    end
  end
end
