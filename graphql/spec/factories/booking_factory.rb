# frozen_string_literal: true

FactoryBot.define do
  factory :booking do
    status { 'active' }
    booked_for { DateTime.now + 2.days }
    event { create(:event) }
    trip { create(:trip) }
  end
end
