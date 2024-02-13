# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EventsQuery, type: :query do
  let!(:now) { Time.zone.now.at_beginning_of_day }
  let!(:past_date) { now - 2.days }
  let!(:future_2_day) { now + 2.days }
  let!(:future_4_day) { now + 4.days }
  let!(:future_6_day) { now + 6.days }
  let!(:future_8_day) { now + 8.days }

  before do
    Searchkick.callbacks(:inline) do
      Event.search_index.refresh
      # create events
      # this event will be out of scope by default
      # because it's in the past
      create(:published_event,
             organizer_price_per_uom: Money.new(13, :usd),
             single_days_with_time: [past_date],
             schedules: [build(:schedule, scheduled_for: past_date)])
      create(:published_event,
             organizer_price_per_uom: Money.new(130, :usd),
             single_days_with_time: [future_2_day],
             schedules: [build(:schedule, scheduled_for: future_2_day)])
      create(:published_event,
             organizer_price_per_uom: Money.new(1300, :usd),
             single_days_with_time: [future_4_day],
             schedules: [build(:schedule, scheduled_for: future_4_day)])
      create(:published_event,
             organizer_price_per_uom: Money.new(13_000, :usd),
             single_days_with_time: [future_6_day],
             schedules: [build(:schedule, scheduled_for: future_6_day)])
      create(:published_event,
             organizer_price_per_uom: Money.new(130_000, :usd),
             single_days_with_time: [future_8_day],
             schedules: [build(:schedule, scheduled_for: future_8_day)])
    end
  end

  teardown do
    Event.search_index.refresh
  end

  describe 'initialization' do
    it 'with all future events' do
      Event.reindex_test
      Timecop.freeze(Time.current) do
        query = EventsQuery.new
        expect(query.conditions).to eq({ dates: { gte: Time.current }, status: [:published] })
        expect(query.total).to eq(4)
      end
    end
  end

  describe 'query by price' do
    context 'by min and max prices' do
      it 'should include one event' do
        Event.reindex_test
        Timecop.freeze(Time.current) do
          query = EventsQuery.new({ min_price: 125, max_price: 1295 })
          expect(query.conditions).to eq({ dates: { gte: Time.current }, price: { gte: 12_500, lte: 129_500 }, status: [:published] })
          expect(query.total).to eq(1)

          event = query.execute.to_a.last
          expect(event.attendee_price_per_uom).to eq(Money.new(14_300, :rsd))
        end
      end
    end
  end

  describe 'query by dates' do
    context '3 days in future' do
      it 'with events in the next 3 days' do
        Event.reindex_test
        Timecop.freeze(Time.current) do
          query = EventsQuery.new({ start_date: now, end_date: now + 3.days })
          expect(query.conditions).to eq({ dates: { gte: now, lte: now + 3.days }, status: [:published] })
          expect(query.total).to eq(1)

          event = query.execute.to_a.last
          expect(event.available_dates).to include(future_2_day)
        end
      end
    end

    context 'from 1 to 5 days in future' do
      it 'with events from 1 to 5 days' do
        Event.reindex_test
        Timecop.freeze(Time.current) do
          query = EventsQuery.new({ start_date: now + 3.days,
                                    end_date: now + 5.days })
          expect(query.conditions).to eq({ dates: { gte: now + 3.days, lte: now + 5.days }, status: [:published] })
          expect(query.total).to eq(1)

          event = query.execute.to_a.last
          expect(event.available_dates).to include(future_4_day)
        end
      end
    end
  end
end
