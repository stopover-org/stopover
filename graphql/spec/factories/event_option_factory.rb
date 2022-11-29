# frozen_string_literal: true

FactoryBot.define do
  factory :event_option do
    event { create(:event) }
    title { Faker::Coffee.blend_name }
    description { Faker::Coffee.notes }
    organizer_cost_cents { 400 }
  
    trait :built_in_option do
      built_in { true }
    end
    trait :for_attendee_option do
      for_attendee { true }
    end

    factory :built_in_event_option, traits: [:built_in_option]

    factory :for_attendee_event_option, traits: [:for_attendee_option]
    factory :built_in_attendee_option, traits: [:for_attendee_option, :built_in_option]
  end
end