# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AttendeesQuery, type: :query do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  let!(:now)          { Time.zone.now.at_beginning_of_day }
  let!(:past_date)    { now - 2.days }
  let!(:future_2_day) { now + 2.days }
  let!(:future_4_day) { now + 4.days }

  let!(:event_in_to_past_date) do
    create(:event,
           single_days_with_time: [past_date],
             schedules: [build(:schedule, scheduled_for: past_date)])
  end
  let!(:event_in_to_2_days) do
    create(:event,
           single_days_with_time: [future_2_day],
             schedules: [build(:schedule, scheduled_for: future_2_day)])
  end
  let!(:event_in_to_4_days) do
    create(:event,
           single_days_with_time: [future_4_day],
             schedules: [build(:schedule, scheduled_for: future_4_day)])
  end

  before do
    create(:booking,
           schedule: event_in_to_past_date.schedules.first,
           event: event_in_to_past_date,
           attendees: [
             build(:attendee,
                   first_name: 'Martin',
                   last_name: 'Pridurok',
                   email: 'dumpshitfuck@gmail.com'),
             build(:attendee,
                   first_name: 'Marisha',
                   last_name: 'Shkura',
                   email: 'dumpbitch@gmail.com')
           ])
    create(:booking,
           schedule: event_in_to_2_days.schedules.first,
           event: event_in_to_2_days,
           attendees: [
             build(:attendee,
                   first_name: 'Martin',
                   last_name: 'Pridurok',
                   email: 'dumpshitfuck@gmail.com',
                   status: 'registered'),
             build(:attendee,
                   first_name: 'Marisha',
                   last_name: 'Shkura',
                   email: 'dumpbitch@gmail.com')
           ])
    create(:booking,
           schedule: event_in_to_4_days.schedules.first,
           event: event_in_to_4_days,
           attendees: [
             build(:attendee,
                   first_name: 'Matreshka',
                   last_name: 'Ha',
                   email: 'dumpshitfuck@gmail.com'),
             build(:attendee,
                   first_name: 'Wow',
                   last_name: 'No shit',
                   email: 'dumpbitch@gmail.com')
           ])

    Attendee.where(first_name: 'guest').delete_all
  end

  describe 'initialization' do
    let(:query) { AttendeesQuery.new }
    subject { query.all }

    it 'with all future events' do
      expect(subject.count).to eq(10)
    end
  end

  describe 'with is registered' do
    let(:query) { AttendeesQuery.new(status: 'registered') }
    subject { query.all }

    it 'attendee is registered' do
      expect(subject.count).to eq(1)
    end
  end

  describe 'searching by name' do
    let(:query) { AttendeesQuery.new(first_name: 'Martin') }
    subject { query.all }

    it 'successfully found one attendee' do
      expect(subject.count).to eq(1)
    end
  end

  describe 'search by event' do
    let(:query) { AttendeesQuery.new(event: event_in_to_4_days) }
    subject { query.all }

    it 'found by name' do
      expect(subject.count).to eq(2)
    end
  end
end
