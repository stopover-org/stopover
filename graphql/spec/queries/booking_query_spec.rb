# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BookingQuery, type: :query do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  let!(:now)          { Time.zone.now.at_beginning_of_day + 1.hour }
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
    Booking.reindex_test
  end
  subject { query.execute }

  describe 'initialization' do
    let(:query) { BookingQuery.new }

    it 'by default only future bookings initialized' do
      expect(query.conditions).to eq({})
      expect(query.execute.to_a).to include(*Booking.all.to_a)
      expect(query.total).to eq(3)
    end
  end

  describe 'search by scheduled for' do
    let(:query) { BookingQuery.new({ booked_for: event_in_to_2_days.schedules.last.scheduled_for }) }

    it 'scheduled_for is requested' do
      expect(query.conditions).to eq({ booked_for: { gt: event_in_to_2_days.schedules.last.scheduled_for.at_beginning_of_day,
                                                     lt: event_in_to_2_days.schedules.last.scheduled_for.at_end_of_day } })
      expect(query.execute.to_a).to include(event_in_to_2_days.schedules.first.bookings.first)
      expect(query.total).to eq(1)
    end
  end

  describe 'search by trip' do
    let(:query) { BookingQuery.new({ trip_id: trip.id }) }

    it 'trip is requested' do
      expect(query.conditions).to eq({ trip_id: trip.id })
      expect(query.execute.to_a).to include(trip.bookings.first)
      expect(query.total).to eq(1)
    end
  end
end
