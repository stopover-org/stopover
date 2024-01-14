# frozen_string_literal: true

# == Schema Information
#
# Table name: addresses
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  full_address :text
#  house_number :string
#  latitude     :float
#  longitude    :float
#  postal_code  :string
#  region       :string
#  street       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  firm_id      :bigint
#
# Indexes
#
#  index_addresses_on_firm_id  (firm_id)
#
FactoryBot.define do
  factory :address do
    house_number { Faker::Address.building_number }
    street { Faker::Address.street_name }
    city { Faker::Address.city }
    country { Faker::Address.country }
    full_address { Faker::Address.full_address }
  end
end
