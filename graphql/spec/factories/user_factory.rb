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
    phone { "+38161523#{(0...4).map { rand(1..9) }.join}" }
    email { Faker::Internet.email }

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

    transient do
      with_account { false }
    end

    after(:create) do |user, evaluator|
      Account.create!(user: user, name: Faker::Name.name) if evaluator.with_account
    end

    factory :active_user, traits: [:active]
    factory :temporary_user, traits: [:temporary]
    factory :inactive_user, traits: [:inactive]
  end
end
