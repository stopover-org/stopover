# frozen_string_literal: true

FactoryBot.define do
  factory :booking do
    status { 'active' }
    event { create(:event) }
    trip { create(:trip) }
    booked_for { event.available_dates.last }
  end
end
