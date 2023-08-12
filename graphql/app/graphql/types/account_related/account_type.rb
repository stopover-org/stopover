# frozen_string_literal: true

module Types
  module AccountRelated
    class AccountType < Types::ModelObject
      field :id, ID, null: false
      field :status, String, null: false

      field :name, String, null: false
      field :street, String
      field :city, String
      field :region, String
      field :country, String
      field :full_address, String
      field :longitude, Float
      field :latitude, Float
      field :phone, [String]
      field :primary_notification_method, String, null: false
      field :verified_at, String
      field :interests, [Types::EventRelated::InterestType]
      field :firm, Types::FirmRelated::FirmType
      field :trips, [Types::TripRelated::TripType], null: false
      field :trip, Types::TripRelated::TripType, null: false do
        argument :trip_id, ID, loads: Types::TripRelated::TripType
      end

      def trip(trip:)
        trip
      end

      def firm
        object.current_firm
      end
    end
  end
end
