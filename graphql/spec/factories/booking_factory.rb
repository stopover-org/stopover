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
  end
end
