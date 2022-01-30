module Mutations
  class SetUpAccount < BaseMutation
    field :user, Types::UserType

    argument :name, String

    argument :house_number, String, required: false
    argument :street, String, required: false
    argument :city, String, required: false
    argument :county, String
    argument :region, String, required: false

    argument :full_address, String
    argument :longitude, Float
    argument :latitude, Float
    argument :primary_phone, String

    def resolve

    end
  end
end