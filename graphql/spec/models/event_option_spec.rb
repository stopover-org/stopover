# frozen_string_literal: true

# == Schema Information
#
# Table name: event_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  built_in              :boolean          default(FALSE)
#  description           :text
#  for_attendee          :boolean          default(FALSE)
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint           not null
#
# Indexes
#
#  index_event_options_on_event_id  (event_id)
#
require 'rails_helper'

RSpec.describe EventOption, type: :model do
  describe 'cost for attendee' do
    let!(:event_option) { create(:event_option) }
    it 'is right amount' do
      expect(event_option.attendee_price_cents).to eq(440)
    end
    it 'is updated' do
      event_option.update!(organizer_price_cents: 500)
      expect(event_option.attendee_price_cents).to eq(550)
    end
  end
end
