# frozen_string_literal: true

module Types
  class AccountType < Types::BaseObject
    field :id, ID, null: false
    field :status, String, null: false

    field :name, String
    field :street, String
    field :city, String
    field :region, String
    field :country, String
    field :full_address, String
    field :longitude, Float
    field :latitude, Float
    field :phone, [String]
    field :primary_phone, String
    field :verified_at, String

    field :interests, [Types::InterestType]

    def authorized?(object, context)
      super && context[:current_user]&.account == object
    end
  end
end
