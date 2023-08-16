# frozen_string_literal: true

# == Schema Information
#
# Table name: event_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  built_in              :boolean          default(FALSE)
#  description           :text
#  for_attendee          :boolean          default(FALSE)
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint           not null
#
# Indexes
#
#  index_event_options_on_event_id  (event_id)
#
FactoryBot.define do
  factory :event_option do
    event { create(:event) }
    title { Faker::Coffee.blend_name }
    description { Faker::Coffee.notes }
    organizer_price_cents { 400 }

    trait :built_in_option do
      built_in { true }
    end

    trait :for_attendee_option do
      for_attendee { true }
    end

    after(:create) do |event_option|
      create(:stripe_integration,
             stripeable: event_option,
             product_id: 'product_id',
             price_id: 'price_id_full_amount')
    end

    factory :built_in_event_option, traits: [:built_in_option]
    factory :for_attendee_event_option, traits: [:for_attendee_option]
    factory :built_in_attendee_option, traits: %i[for_attendee_option built_in_option]
  end
end
