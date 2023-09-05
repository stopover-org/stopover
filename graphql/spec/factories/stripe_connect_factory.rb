# frozen_string_literal: true

FactoryBot.define do
  factory :stripe_connect do
    activated_at { nil }
    stripe_connect_id { Faker::Internet.password }
  end
end
