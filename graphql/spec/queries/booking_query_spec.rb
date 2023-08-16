# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BookingQuery, type: :query do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  let!(:now)          { Time.zone.now.at_beginning_of_day }
  let!(:past_date)    { now - 2.days }
  let!(:future_2_day) { now + 2.days }
  let!(:future_4_day) { now + 4.days }

  let!(:event_in_to_past_date) do
    create(:published_event,
           single_days_with_time: [past_date],
           schedules: [build(:schedule, scheduled_for: past_date)])
  end
  let!(:event_in_to_2_days) do
    create(:published_event,
           single_days_with_time: [future_2_day],
           schedules: [build(:schedule, scheduled_for: future_2_day)])
  end
  let!(:event_in_to_4_days) do
    create(:published_event,
           single_days_with_time: [future_4_day],
           schedules: [build(:schedule, scheduled_for: future_4_day)])
  end
  let!(:trip) { create(:trip) }

  before do
    create(:booking,
           schedule: event_in_to_past_date.schedules.first,
           event: event_in_to_past_date)
    create(:booking,
           schedule: event_in_to_2_days.schedules.first,
           event: event_in_to_2_days,
           status: 'paid')
    create(:booking,
           schedule: event_in_to_4_days.schedules.first,
           event: event_in_to_4_days,
           trip: trip)
  end
  subject { query.all }

  describe 'initialization' do
    let(:query) { BookingQuery.new }

    it 'by default only future bookings initialized' do
      expect(subject.count).to eq(2)
    end
  end

  describe 'search by scheduled for' do
    let(:query) { BookingQuery.new(scheduled_for: event_in_to_2_days.schedules.last.scheduled_for) }

    it 'scheduled_for is requested' do
      expect(subject.count).to eq(1)
    end
  end

  describe 'search by trip' do
    let(:query) { BookingQuery.new(trip_id: trip) }

    it 'trip is requested' do
      expect(subject.count).to eq(1)
    end
  end
end
