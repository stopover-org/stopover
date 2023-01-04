# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RemoveFirmJob, type: :job do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  describe 'remove firm job' do
    let!(:firm) { create(:firm) }
    let!(:events) { create_list(:recurring_event, 10, skip_schedules: true, firm_id: firm.id) }

    it 'deleted events associated with firm' do
      expect(events.count).to eq(10)
      events.each do |event|
        expect(event.schedules.count).to eq(0)
      end
      RemoveFirmJob.perform_now(firm.id)
      events.each do |event|
        expect(event.reload.status).to eq('deleted')
        expect(event.schedules.count).to eq(0)
      end
    end

    context 'with schedules and events associated with firm' do
      let!(:firm) { create(:firm) }
      let!(:events) { create_list(:recurring_event, 10, firm_id: firm.id) }

      it 'deleted' do
        expect(events.count).to eq(10)
        events.each do |event|
          expect(event.schedules.count).to eq(56)
        end
        RemoveFirmJob.perform_now(firm.id)
        events.each do |event|
          expect(event.reload.status).to eq('deleted')
          expect(event.schedules.count).to eq(0)
        end
      end
    end

    context 'with only future schedules' do
      let!(:firm) { create(:firm) }
      let!(:events) { create_list(:schedules_past_date, 10, firm_id: firm.id) }

      it 'deleted' do
        expect(events.count).to eq(10)
        events.each do |event|
          expect(event.schedules.count).to eq(59)
        end
        RemoveFirmJob.perform_now(firm.id)
        events.each do |event|
          expect(event.reload.status).to eq('deleted')
          expect(event.schedules.count).to eq(3)
        end
      end
    end
  end
end
