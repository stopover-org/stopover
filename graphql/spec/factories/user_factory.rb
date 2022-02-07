# frozen_string_literal: true
require 'faker'

FactoryBot.define do
  factory :user do
    phone { Faker::PhoneNumber.phone_number }
    email { Faker::Internet.email }

    trait :active do
      session_password { Faker::Internet.password }
      status { 'active' }
      confirmed_at { DateTime.now }
    end

    factory :active_user, traits: [:active]
  end
end
