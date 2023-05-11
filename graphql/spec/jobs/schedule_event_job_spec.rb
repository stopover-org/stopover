# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ScheduleEventJob, type: :job do
  describe 'schedule event job' do
    let!(:event) { create(:recurring_event, skip_schedules: true) }

    it 'schedules event' do
      expect(event.schedules.count).to eq(0)
      ScheduleEventJob.perform_now(event_id: event.id)
      expect(event.reload.schedules.count).to eq(56)
    end
  end
end
