# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id              :bigint           not null, primary key
#  city            :string
#  contact_person  :string
#  contacts        :text
#  country         :string
#  description     :text
#  full_address    :string
#  house_number    :string
#  latitude        :float
#  longitude       :float
#  primary_email   :string
#  primary_phone   :string
#  region          :string
#  status          :string           default("pending")
#  street          :string
#  stripe_account  :string           default("")
#  title           :string           not null
#  website         :string
#  setup_intent_id :bigint
#
# Indexes
#
#  index_firms_on_setup_intent_id  (setup_intent_id)
#
# Foreign Keys
#
#  fk_rails_...  (setup_intent_id => setup_intents.id)
#

FactoryBot.define do
  factory :firm do
    title { Faker::App.name }
    primary_email { Faker::Internet.email }
    accounts { create_list(:account, 1) }
  end
end
