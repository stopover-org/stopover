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
#  margin            :integer          default(0)
#  payment_types     :string           default([]), not null, is an Array
#  postal_code       :string
#  primary_email     :string
#  primary_phone     :string
#  ref_number        :string
#  region            :string
#  status            :string           default("pending")
#  street            :string
#  title             :string           not null
#  website           :string
#  stripe_account_id :string
#
# Indexes
#
#  index_firms_on_ref_number  (ref_number) UNIQUE
#

FactoryBot.define do
  factory :firm do
    title { Faker::App.name }
    primary_email { Faker::Internet.email }
    margin { 10 }
    city { 'Belgrade' }
    country { 'Serbia' }

    transient do
      accounts { create_list(:account, 1) }
      skip_accounts { false }
    end

    before(:create) do |firm, evaluator|
      unless evaluator.skip_accounts
        evaluator.accounts.map do |account|
          firm.account_firms << firm.account_firms.build(account: account)
          account.update!(firm: firm)
        end
      end
    end
  end
end
