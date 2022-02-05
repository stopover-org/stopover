module Mutations
  class SetUpAccount < BaseMutation
    field :user, Types::UserType

    argument :name, String

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String, required: false
    argument :country, String
    argument :region, String, required: false

    argument :full_address, String
    argument :longitude, Float
    argument :latitude, Float
    argument :primary_phone, String

    argument :interest_ids, [ID], loads: Types::InterestType, required: false

    def resolve (house_number: nil, street: nil, city: nil, country:, region: nil, full_address:, longitude:, latitude:, primary_phone:, name:, **args)
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

      return {
        user: user
      }
    end
  end
end