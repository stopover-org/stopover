# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  deposit_amount_cents          :decimal(, )      default(0.0), not null
#  description                   :text             not null
#  duration_time                 :string
#  end_date                      :datetime
#  event_type                    :string           not null
#  featured                      :boolean          default(FALSE)
#  landmark                      :string
#  language                      :string           default("en")
#  max_attendees                 :integer
#  min_attendees                 :integer          default(0)
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  recurring_days_with_time      :string           default([]), is an Array
#  ref_number                    :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_deposit              :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  address_id                    :bigint
#  firm_id                       :bigint
#
# Indexes
#
#  index_events_on_address_id              (address_id)
#  index_events_on_event_type              (event_type)
#  index_events_on_firm_id                 (firm_id)
#  index_events_on_ref_number_and_firm_id  (ref_number,firm_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (firm_id => firms.id)
#
FactoryBot.define do
  factory :event do
    title { Faker::App.name }
    description { Faker::Hipster.paragraphs.join(' ') }
    event_type { :excursion }
    firm { create(:firm) }
    organizer_price_per_uom_cents { 500 }
    deposit_amount_cents { 100 }
    duration_time { '4h' }

    transient do
      skip_schedules { false }
    end

    before(:create) do |event|
      event.address = Address.create(firm: event.firm)
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
        user = create(:active_user, with_account: true)
        event.bookings.create!(event_id: event.id,
                               schedule_id: event.schedules.last.id,
                               stripe_integration: event.current_stripe_integration,
                               trip: create(:trip,
                                            account: user.account))
      end
    end

    trait :stripe_integration_trait do
      after(:create) do |event|
        create(:stripe_integration,
               stripeable: event,
               product_id: 'product_id',
               price_id: 'price_id_full_amount')
      end
    end

    trait :published do
      status { :published }
    end

    factory :published_event, traits: %i[published stripe_integration_trait]
    factory :stripe_integration_factory, traits: %i[stripe_integration_trait recurring published]
    factory :limited_event, traits: %i[limited_attendee recurring]
    factory :recurring_not_published_event, traits: %i[recurring stripe_integration_trait]
    factory :recurring_event, traits: %i[recurring published stripe_integration_trait]
    factory :schedules_past_date, traits: %i[past_schedules recurring]
    factory :schedule_is_booked, traits: %i[past_schedules recurring stripe_integration_trait booking_schedule]
  end
end
