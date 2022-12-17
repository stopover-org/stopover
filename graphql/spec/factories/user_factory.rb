# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                :bigint           not null, primary key
#  confirmation_code :string
#  confirmed_at      :datetime
#  disabled_at       :datetime
#  email             :string
#  last_try          :datetime
#  phone             :string
#  session_password  :string
#  status            :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#  index_users_on_phone  (phone) UNIQUE
#
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
