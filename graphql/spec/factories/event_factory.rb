# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    title { Faker::App.name }
    description { Faker::Hipster.paragraphs }
    event_type { :excursion }
    recurring_type { :regular }
    unit { create(:unit) }
    organizer_price_per_uom_cents { 500 }
    country { Faker::Address.country }
    city { Faker::Address.city }
    full_address { Faker::Address.full_address }
    duration_time { '4h' }

    trait :recurring do
      recurring_days_with_time do
        %w[Sunday Monday Tuesday Wednesday Thursday Friday Saturday].map do |d|
          ["#{d} 11:30", "#{d} 21:30"]
        end.flatten!
      end
    end

    factory :recurring_event, traits: [:recurring]
  end
end
