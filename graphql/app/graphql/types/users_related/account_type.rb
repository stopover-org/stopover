# frozen_string_literal: true

module Types
  module UsersRelated
    class AccountType < Types::ModelObject
      field :id,            ID, null: false
      field :status,        String, null: false

      field :name,          String, null: false
      field :street,        String
      field :city,          String
      field :region,        String
      field :country,       String
      field :full_address,  String
      field :longitude,     Float
      field :latitude,      Float
      field :phones,        [String]
      field :primary_phone, String
      field :primary_email, String
      field :date_of_birth, Types::DateTimeType
      field :verified_at,   String
      field :interests,     [Types::EventsRelated::InterestType]
      field :firm,          Types::FirmsRelated::FirmType
      field :firms,         [Types::FirmsRelated::FirmType], null: false
      field :trips,         [Types::TripsRelated::TripType], null: false
      field :trip,          Types::TripsRelated::TripType,   null: false do
        argument :trip_id, ID, loads: Types::TripsRelated::TripType
      end
      field :user, Types::UsersRelated::UserType, null: false

      def trip(trip:)
        trip
      end

      def firm
        object.current_firm
      end
    end
  end
end
