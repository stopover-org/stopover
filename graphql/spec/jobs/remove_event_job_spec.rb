# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RemoveEventJob, type: :job do
  describe 'remove event job' do
    let!(:event) { create(:event) }

    it 'event status changed' do
      expect(event.status).to eq('draft')
      RemoveEventJob.perform_now(event.id)
      expect(event.reload.status).to eq('deleted')
    end
  end
end
