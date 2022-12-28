# == Schema Information
#
# Table name: firms
#
#  id             :bigint           not null, primary key
#  city           :string
#  contact_person :string
#  contacts       :text
#  country        :string
#  description    :text
#  full_address   :string
#  house_number   :string
#  latitude       :float
#  longitude      :float
#  primary_email  :string           not null
#  primary_phone  :string
#  region         :string
#  status         :string           default("pending")
#  street         :string
#  title          :string           not null
#  website        :string
#
# frozen_string_literal: true

FactoryBot.define do
  factory :firm do
    title { Faker::App.name }
    primary_email { Faker::Internet.email }
  end
end
