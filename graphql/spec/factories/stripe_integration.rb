# frozen_string_literal: true

FactoryBot.define do
  factory :stripe_integration do
    price_id { 'temp_price_id' }
    product_id { 'temp_product_id' }
  end
end
