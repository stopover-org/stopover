# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EventsQuery, type: :query do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  let!(:now)          { Time.zone.now.at_beginning_of_day }
  let!(:past_date)    { now - 2.days }
  let!(:future_2_day) { now + 2.days }
  let!(:future_4_day) { now + 4.days }
  let!(:future_6_day) { now + 6.days }
  let!(:future_8_day) { now + 8.days }

  before do
    # create events
    # this event will be out of scope by default
    # because it's in the past
    create(:event,
           organizer_price_per_uom: Money.new(13, :usd),
           single_days_with_time: [past_date],
           schedules: [build(:schedule, scheduled_for: past_date)])
    create(:event,
           organizer_price_per_uom: Money.new(130, :usd),
           single_days_with_time: [future_2_day],
           schedules: [build(:schedule, scheduled_for: future_2_day)])
    create(:event,
           organizer_price_per_uom: Money.new(1300, :usd),
           single_days_with_time: [future_4_day],
           schedules: [build(:schedule, scheduled_for: future_4_day)])
    create(:event,
           organizer_price_per_uom: Money.new(13_000, :usd),
           single_days_with_time: [future_6_day],
           schedules: [build(:schedule, scheduled_for: future_6_day)])
    create(:event,
           organizer_price_per_uom: Money.new(130_000, :usd),
           single_days_with_time: [future_8_day],
           schedules: [build(:schedule, scheduled_for: future_8_day)])

    # drop existing tags for test purposes
    Tag.all.delete_all

    # create new tags
    create(:tag, title: 'excursion'.titleize)
    create(:tag, title: 'tour'.titleize)
    Event.offset(1).first(2).each { |event| event.tags << Tag.first }
    Event.offset(1).last(2).each { |event| event.tags << Tag.last }
  end

  describe 'search by tag' do
    let(:query) { EventsQuery.new({ tags: ['excursion'] }) }
    subject { query.all }

    it 'events with tag excursion' do
      expect(subject.count).to eq(2)
    end
  end

  describe 'search by multiple tags' do
    let(:query) { EventsQuery.new({ tags: %w[excursion tour] }) }

    subject { query.all }

    it 'events with tags excursion and tour' do
      expect(subject.count).to eq(4)
    end
  end

  describe 'initialization' do
    let(:query) { EventsQuery.new }

    subject { query.all }

    it 'with all future events' do
      expect(subject.count).to eq(4)
    end
  end

  describe 'query by price' do
    context 'by min and max prices' do
      let!(:query) { EventsQuery.new({ min_price: 125, max_price: 1295 }) }

      subject { query.all }

      it 'should include one event' do
        expect(subject.all.count).to eq(1)

        event = subject.last
        expect(event.attendee_price_per_uom).to eq(Money.new(143, :usd))
      end
    end
  end

  describe 'query by dates' do
    context '3 days in future' do
      let!(:query) { EventsQuery.new({ start_date: now, end_date: now + 3.days }) }

      subject { query.all }

      it 'with events in the next 3 days' do
        expect(subject.count).to eq(1)

        event = subject.last
        expect(event.available_dates).to include(future_2_day)
      end
    end

    context 'from 1 to 5 days in future' do
      let!(:query) do
        EventsQuery.new({ start_date: now + 3.days,
                                      end_date: now + 5.days })
      end

      subject { query.all }

      it 'with events from 1 to 5 days' do
        expect(subject.count).to eq(1)

        event = subject.last
        expect(event.available_dates).to include(future_4_day)
      end
    end

    context 'with past events' do
      let!(:query) do
        EventsQuery.new({ start_date: now - 3.days,
                                      end_date: now }, Event.all)
      end

      subject { query.all }

      it 'with events in the past few days' do
        expect(subject.count).to eq(1)

        event = subject.last
        expect(event.available_dates).not_to include(past_date)
      end
    end
  end
end
