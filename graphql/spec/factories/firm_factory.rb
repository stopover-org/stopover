# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id                :bigint           not null, primary key
#  business_type     :string           default("individual"), not null
#  city              :string
#  contact_person    :string
#  contacts          :text
#  country           :string
#  description       :text
#  full_address      :string
#  house_number      :string
#  latitude          :float
#  longitude         :float
#  postal_code       :string
#  primary_email     :string
#  primary_phone     :string
#  region            :string
#  status            :string           default("pending")
#  street            :string
#  title             :string           not null
#  website           :string
#  stripe_account_id :string
#

FactoryBot.define do
  factory :firm do
    title { Faker::App.name }
    primary_email { Faker::Internet.email }
    accounts { create_list(:account, 1) }
  end
end
