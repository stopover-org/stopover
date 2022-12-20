# frozen_string_literal: true

# == Schema Information
#
# Table name: events
#
#  id                            :bigint           not null, primary key
#  attendee_price_per_uom_cents  :decimal(, )      default(0.0)
#  city                          :string
#  country                       :string
#  description                   :text             not null
#  duration_time                 :string
#  event_type                    :string           not null
#  full_address                  :string
#  house_number                  :string
#  landmark                      :string
#  latitude                      :float
#  longitude                     :float
#  organizer_price_per_uom_cents :decimal(, )      default(0.0)
#  prepaid_amount_cents          :bigint           default(0), not null
#  prepaid_type                  :string
#  recurring_days_with_time      :string           default([]), is an Array
#  recurring_type                :string           not null
#  region                        :string
#  requires_check_in             :boolean          default(FALSE), not null
#  requires_contract             :boolean          default(FALSE), not null
#  requires_passport             :boolean          default(FALSE), not null
#  requires_prepaid              :boolean          default(FALSE), not null
#  single_days_with_time         :datetime         default([]), is an Array
#  status                        :string
#  street                        :string
#  title                         :string           not null
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  external_id                   :string
#  unit_id                       :bigint
#
# Indexes
#
#  index_events_on_event_type  (event_type)
#  index_events_on_unit_id     (unit_id)
#
# Foreign Keys
#
#  fk_rails_...  (unit_id => units.id)
#
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
  describe 'cost for attendee' do
    let!(:event) { create(:recurring_event) }
    it '10 percente greater' do
      expect(event.attendee_price_per_uom_cents).to eq(500 * 1.1)
    end
    it 'will be updated' do
      event.update!(organizer_price_per_uom_cents: 1000)
      expect(event.attendee_price_per_uom_cents).to eq(1100)
    end
  end
end
