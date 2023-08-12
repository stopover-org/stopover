# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  fee_cents                  :decimal(, )      default(0.0)
#  payment_type               :string
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  firm_id                    :bigint
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_balance_id  (balance_id)
#  index_payments_on_booking_id  (booking_id)
#  index_payments_on_firm_id     (firm_id)
#
FactoryBot.define do
  factory :payment do
    total_price_cents { 200 }
    booking { create(:booking) }
    firm { create(:firm) }

    trait :payment_in_process_trait do
      status { 'processing' }
    end

    trait :payment_successful_trait do
      status { 'successful' }
    end

    factory :payment_in_process, traits: [:payment_in_process_trait]
    factory :payment_successful, traits: [:payment_successful_trait]
  end
end
