# frozen_string_literal: true

module Mutations
  class SetUpAccount < BaseMutation
    authorized_only

    field :user, Types::UserType

    argument :name, String

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String, required: false
    argument :country, String, required: true
    argument :region, String, required: false

    argument :full_address, String, required: true
    argument :longitude, Float, required: false
    argument :latitude, Float, required: false
    argument :primary_phone, String, required: true

    argument :interest_ids, [ID], loads: Types::InterestType, required: false

    def resolve(country:, full_address:, longitude:, latitude:, primary_phone:, name:, house_number: nil, street: nil, city: nil, region: nil, **args)
      user = current_user
      return nil unless user

      account = user.account
      account ||= Account.new(primary_phone: user.phone, phones: user.phone.present? ? [user.phone] : [])

      account.house_number = house_number
      account.street = street
      account.city = city
      account.country = country
      account.region = region
      account.full_address = full_address
      account.longitude = longitude
      account.latitude = latitude
      account.primary_phone = primary_phone
      account.name = name

      account.interests = args[:interests] if args[:interests]

      user.account.save!

      {
        user: user
      }
    end
  end
end
