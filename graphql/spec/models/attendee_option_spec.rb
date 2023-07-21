# frozen_string_literal: true

# == Schema Information
#
# Table name: attendee_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  attendee_id           :bigint
#  event_option_id       :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id      (attendee_id)
#  index_attendee_options_on_event_option_id  (event_option_id)
#
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
