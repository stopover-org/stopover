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
#  latitude                      :float
#  longitude                     :float
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  recurring_days_with_time      :string           default([]), is an Array
#  recurring_type                :string           not null
#  region                        :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  street                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  unit_id                       :bigint
#
# Indexes
#
#  index_events_on_event_type  (event_type)
#  index_events_on_unit_id     (unit_id)
#
# Foreign Keys
#
#  fk_rails_...  (unit_id => units.id)
#
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

      after(:create) do |event|
        EventSupport.schedule(event)
      end
    end

    factory :recurring_event, traits: [:recurring]
  end
end
