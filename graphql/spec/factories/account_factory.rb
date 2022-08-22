# frozen_string_literal: true

FactoryBot.define do
  factory :account do
    user { create :active_user }
    name { Faker::Name.name }
    house_number { Faker::Address.building_number }
    street { Faker::Address.street_name }
    city { Faker::Address.city }
    country { Faker::Address.country }
    full_address { Faker::Address.full_address }
    phones { 5.times.map { Faker::PhoneNumber.phone_number } }
  end
end
