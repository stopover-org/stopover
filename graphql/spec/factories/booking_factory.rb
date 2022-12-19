# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id         :bigint           not null, primary key
#  booked_for :datetime         not null
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  event_id   :bigint
#  trip_id    :bigint
#
# Indexes
#
#  index_bookings_on_event_id  (event_id)
#  index_bookings_on_trip_id   (trip_id)
#
FactoryBot.define do
  factory :booking do
    status { 'active' }
    event { create(:event) }
    trip { create(:trip) }
    booked_for { event.available_dates.last }
  end
end