# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  city                          :string
#  country                       :string
#  description                   :text             not null
#  duration_time                 :string
#  event_type                    :string           not null
#  full_address                  :string
#  house_number                  :string
#  landmark                      :string
#  latitude                      :float
#  longitude                     :float
#  max_attendees                 :integer
#  min_attendees                 :integer          default(0)
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  prepaid_amount_cents          :decimal(, )      default(0.0), not null
#  prepaid_type                  :string
#  recurring_days_with_time      :string           default([]), is an Array
#  recurring_type                :string           not null
#  region                        :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  requires_prepaid              :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  street                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  external_id                   :string
#  firm_id                       :bigint
#  unit_id                       :bigint
#
# Indexes
#
#  index_events_on_event_type   (event_type)
#  index_events_on_external_id  (external_id)
#  index_events_on_firm_id      (firm_id)
#  index_events_on_unit_id      (unit_id)
#
# Foreign Keys
#
#  fk_rails_...  (firm_id => firms.id)
#  fk_rails_...  (unit_id => units.id)
#
FactoryBot.define do
  factory :event do
    title { Faker::App.name }
    description { Faker::Hipster.paragraphs }
    event_type { :excursion }
    recurring_type { :regular }
    unit { create(:unit) }
    firm { create(:firm) }
    organizer_price_per_uom_cents { 500 }
    prepaid_amount_cents { 100 }
    country { Faker::Address.country }
    city { Faker::Address.city }
    full_address { Faker::Address.full_address }
    duration_time { '4h' }

    transient do
      skip_schedules { false }
    end

    trait :recurring do
      recurring_days_with_time do
        %w[Sunday Monday Tuesday Wednesday Thursday Friday Saturday].map do |d|
          ["#{d} 11:30", "#{d} 21:30"]
        end.flatten!
      end

      after(:create) do |event, evaluator|
        Stopover::EventSupport.schedule(event) unless evaluator.skip_schedules
      end
    end

    trait :limited_attendee do
      max_attendees { 1 }
    end

    trait :past_schedules do
      after(:create) do |event|
        event.schedules.create!(scheduled_for: 1.day.ago)
        event.schedules.create!(scheduled_for: 2.days.ago)
        event.schedules.create!(scheduled_for: 3.days.ago)
      end
    end

    trait :booking_schedule do
      after(:create) do |event|
        event.bookings.create(event_id: event.id, schedule_id: event.schedules.last.id)
      end
    end

    trait :stripe_integration_trait do
      after(:create) do |event|
        create(:stripe_integration,
               stripeable: event,
               product_id: 'product_id',
               price_id: 'price_id_full_amount',
               price_type: :full_amount)
        create(:stripe_integration,
               stripeable: event,
               product_id: 'product_id',
               price_id: 'price_id_prepaid_amount',
               price_type: :prepaid_amount)
        create(:stripe_integration,
               stripeable: event,
               product_id: 'product_id',
               price_id: 'price_id_remaining_amount',
               price_type: :remaining_amount)
      end
    end

    factory :stripe_integration_factory, traits: %i[stripe_integration_trait recurring]
    factory :limited_event, traits: %i[limited_attendee recurring]
    factory :recurring_event, traits: [:recurring]
    factory :schedules_past_date, traits: %i[past_schedules recurring]
    factory :schedule_is_booked, traits: %i[past_schedules recurring booking_schedule]
  end
end
