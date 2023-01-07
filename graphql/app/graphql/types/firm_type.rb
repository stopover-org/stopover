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
    field :accounts, [Types::AccountType]
  end
end
