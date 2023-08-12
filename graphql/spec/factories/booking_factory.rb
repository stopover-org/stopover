# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id                    :bigint           not null, primary key
#  status                :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#  trip_id               :bigint
#
# Indexes
#
#  index_bookings_on_event_id               (event_id)
#  index_bookings_on_schedule_id            (schedule_id)
#  index_bookings_on_stripe_integration_id  (stripe_integration_id)
#  index_bookings_on_trip_id                (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
FactoryBot.define do
  factory :booking do
    status { 'active' }
    event { create(:recurring_event) }
    trip { create(:trip) }
    schedule { event.schedules.last }

    trait :future do
      schedule do
        schedule = event.schedules.last
        schedule.update(scheduled_for: 1.week.from_now)
        schedule
      end
    end

    trait :past do
      schedule do
        schedule = event.schedules.first
        schedule.update(scheduled_for: 1.week.ago)
        schedule
      end
    end

    trait :cancelled do
      status { 'cancelled' }
    end

    trait :paid do
      status { 'paid' }
      payments { create_list(:payment_successful, 1, total_price: event.attendee_price_per_uom_cents) }
    end

    trait :not_paid do
      status { 'paid' }
      payments { [] }
    end

    factory :not_paid_booking, traits: [:not_paid]
    factory :future_booking, traits: [:future]
    factory :past_booking, traits: [:past]
    factory :cancelled_booking, traits: [:cancelled]
    factory :paid_booking, traits: [:paid]
  end
end
