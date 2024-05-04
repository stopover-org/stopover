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
#  service_user      :boolean          default(FALSE)
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
    email { "#{SecureRandom.hex(200)}#{Time.zone.now.to_i}@example.com" }

    trait :disabled do
      session_password { Faker::Internet.password }
      status { 'disabled' }
      confirmed_at { Time.zone.now }
    end

    trait :active do
      session_password { Faker::Internet.password }
      status { 'active' }
      confirmed_at { Time.zone.now }
    end

    trait :temporary do
      status { 'temporary' }
      phone { nil }
      email { nil }
    end

    trait :inactive do
      status { 'inactive' }
    end

    trait :service do
      service_user { true }
    end

    transient do
      with_account { false }
    end

    after(:create) do |user, evaluator|
      user.account = Account.create!(user: user, name: user.phone || user.email) if evaluator.with_account
    end

    factory :active_user, traits: [:active]
    factory :service_user, traits: %i[active service]
    factory :temporary_user, traits: [:temporary]
    factory :inactive_user, traits: [:inactive]
    factory :disabled_user, traits: [:disabled]
  end
end
