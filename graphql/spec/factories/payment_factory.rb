# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  payment_type               :string
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  firm_id                    :bigint
#  payment_intent_id          :string
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
    total_price { Money.new(200) }
    booking { create(:booking) }
    payment_type { 'full_amount' }

    trait :payment_in_process_trait do
      status { 'processing' }
    end

    transient do
      with_checkout_session_id { false }
    end

    after(:create) do |payment, evaluator|
      payment.update!(stripe_checkout_session_id: SecureRandom.hex) if evaluator.with_checkout_session_id
    end

    factory :payment_in_process, traits: [:payment_in_process_trait]
  end
end
