# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Firm, type: :model do
  describe 'firm' do
    let!(:firm) { create(:firm) }
    let!(:event) { create_list(:recurring_event, 10, firm_id: firm.id) }

    it 'was deleted' do
      expect(RemoveFirmJob).to receive(:perform_later).with(firm.id)
      firm.soft_delete!
      expect(firm.status).to eq('deleted')
    end
  end
end
