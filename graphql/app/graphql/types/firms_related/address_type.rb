# frozen_string_literal: true

module Types
  module FirmsRelated
    class AddressType < Types::ModelObject
      field :id, ID, null: false

      field :full_address, String
      field :country, String
      field :region, String
      field :city, String
      field :street, String
      field :house_number, String

      field :latitude, Float
      field :longitude, Float
    end
  end
end
