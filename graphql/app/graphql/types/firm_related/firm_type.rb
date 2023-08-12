# frozen_string_literal: true

module Types
  module FirmRelated
    class FirmType < Types::ModelObject
      field :id, ID, null: false
      field :city, String
      field :contact_person, String
      field :contacts, String
      field :country, String
      field :description, String
      field :full_address, String
      field :house_number, String
      field :latitude, Float
      field :longitude, Float
      field :primary_email, String, null: false
      field :primary_phone, String
      field :region, String
      field :status, String
      field :street, String
      field :title, String, null: false
      field :website, String
      field :image, String
      field :payment_types, [String], null: false

      field :balance, Types::FirmRelated::BalanceType
      field :payments, Types::PaymentRelated::PaymentType.connection_type, null: false
      field :bookings, Types::BookingRelated::BookingType.connection_type, null: false
      field :schedules, Types::EventRelated::ScheduleType.connection_type, null: false
      field :events, Types::EventRelated::EventType.connection_type, null: false

      field :stripe_connects, [Types::FirmRelated::StripeConnectType], null: false, require_manager: true
      field :margin, Integer, null: false, require_service_user: true

      field :accounts, [Types::AccountRelated::AccountType]
      field :event, Types::EventRelated::EventType do
        argument :id, ID, required: true, loads: Types::EventRelated::EventType
      end
      field :booking, Types::BookingRelated::BookingType do
        argument :id, ID, required: true, loads: Types::BookingRelated::BookingType
      end

      def image
        return nil if object.image.blank?
        Rails.application.routes.url_helpers.rails_blob_url(object.image)
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
