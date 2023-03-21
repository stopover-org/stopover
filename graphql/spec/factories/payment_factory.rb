# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  booking_id                 :bigint
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_booking_id  (booking_id)
#
FactoryBot.define do
  factory :payment do
    total_price_cents { 200 }
    booking { create(:booking) }

    trait :payment_in_process_trait do
      status { 'processing' }
    end

    factory :payment_in_process, traits: [:payment_in_process_trait]
  end
end
