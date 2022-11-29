# frozen_string_literal: true

require 'rails_helper'

RSpec.describe EventOption, type: :model do
  describe 'cost for attendee' do
    let!(:event_option) {create(:event_option)}
    it 'is right amount' do
      expect(event_option.attendee_cost_cents).to eq(440)
    end
    it 'is updated' do
      event_option.update!(organizer_cost_cents: 500)
      expect(event_option.attendee_cost_cents).to eq(550)
    end
  end
end