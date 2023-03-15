# frozen_string_literal: true

FactoryBot.define do
  factory :payment do
    total_price_cents { 200 }
    booking { create(:booking) }
  end
end
