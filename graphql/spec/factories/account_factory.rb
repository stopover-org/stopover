# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  date_of_birth :datetime
#  language      :string           default("en"), not null
#  name          :string
#  phones        :string           default([]), is an Array
#  primary_email :string
#  primary_phone :string
#  status        :string           default("initial"), not null
#  verified_at   :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  address_id    :bigint
#  firm_id       :bigint
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_address_id  (address_id)
#  index_accounts_on_firm_id     (firm_id)
#  index_accounts_on_user_id     (user_id) UNIQUE
#
FactoryBot.define do
  factory :account do
    user { create(:active_user) }
    name { Faker::Name.name }
    phones { 5.times.map { Faker::PhoneNumber.phone_number } }
    primary_phone { user.phone }
    address { build(:address) }
  end
end
