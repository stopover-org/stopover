# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  city          :string
#  country       :string
#  date_of_birth :datetime
#  full_address  :string
#  house_number  :string
#  last_name     :string
#  latitude      :float
#  longitude     :float
#  name          :string
#  phones        :string           default([]), is an Array
#  postal_code   :string
#  primary_phone :string
#  region        :string
#  status        :string           default("initial"), not null
#  street        :string
#  verified_at   :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  firm_id       :bigint
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_firm_id  (firm_id)
#  index_accounts_on_user_id  (user_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (firm_id => firms.id)
#
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
    primary_phone { user.phone }
  end
end
