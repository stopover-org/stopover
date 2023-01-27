# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AttendeeOption, type: :model do
  describe 'attendee option' do
    let!(:event_option) { create(:event_option, for_attendee: false) }
    let(:attendee_option) { create(:attendee_option, event_option: event_option) }

    it 'cant create attendee option, event option is not for attendee' do
      expect { attendee_option }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
