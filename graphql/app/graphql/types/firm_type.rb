# frozen_string_literal: true

module Types
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

    field :balance, Types::BalanceType
    field :payments, [Types::PaymentType.connection_type], null: false
    field :bookings, [Types::BookingType.connection_type], null: false
    field :schedules, [Types::ScheduleType.connection_type], null: false
    field :events, Types::EventType.connection_type, null: false

    field :accounts, [Types::AccountType]
    field :event, Types::EventType do
      argument :id, ID, required: true, loads: Types::EventType
    end

    def image
      return nil if object.image.blank?
      Rails.application.routes.url_helpers.rails_blob_url(object.image)
    end

    def event(**args)
      args[:id]
    end
  end
end
