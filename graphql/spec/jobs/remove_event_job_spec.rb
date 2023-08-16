# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RemoveEventJob, type: :job do
  describe 'remove event job' do
    let!(:event) { create(:published_event) }

    it 'event status changed' do
      expect(event.status).to eq('published')
      RemoveEventJob.perform_now(event_id: event.id)
      expect(event.reload.status).to eq('removed')
    end
  end
end
