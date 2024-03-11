# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id                        :bigint           not null, primary key
#  available_payment_methods :string           default([]), not null, is an Array
#  business_type             :string           default("individual"), not null
#  contact_person            :string
#  contacts                  :text
#  contract_address          :string
#  description               :text
#  firm_type                 :string           default("onboarding")
#  language                  :string           default("en")
#  margin                    :integer          default(0)
#  payment_types             :string           default([]), not null, is an Array
#  postal_code               :string
#  primary_email             :string
#  primary_phone             :string
#  ref_number                :string
#  status                    :string           default("pending")
#  title                     :string           not null
#  website                   :string
#  address_id                :bigint
#  seo_metadatum_id          :bigint
#  stripe_account_id         :string
#
# Indexes
#
#  index_firms_on_address_id        (address_id)
#  index_firms_on_ref_number        (ref_number) UNIQUE
#  index_firms_on_seo_metadatum_id  (seo_metadatum_id)
#

FactoryBot.define do
  factory :firm do
    title { Faker::App.name }
    primary_email { Faker::Internet.email }
    description { Faker::Hipster.paragraphs.join('. ') }
    margin { 10 }
    address { build(:address) }
    status { 'active' }
    firm_type { 'live' }

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
