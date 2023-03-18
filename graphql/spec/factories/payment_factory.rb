# frozen_string_literal: true

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
