# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event, type: :model do
  travel_to DateTime.new(2022, 1, 1, 0, 0)
  describe 'active event' do
    context 'with recurrent dates' do
      let!(:event) { create(:recurring_event, recurring_days_with_time: ['Monday 11:30']) }
      it 'should return array of future dates' do
        expect(event.available_dates.length).to eq(4)
        expect(event.available_dates.first).to eq(DateTime.new(2022, 1, 3, 11, 30))
      end
    end
  end
end
