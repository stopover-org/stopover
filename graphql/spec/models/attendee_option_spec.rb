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
#  booking_id            :bigint
#  event_id              :bigint
#  event_option_id       :bigint
#  firm_id               :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id            (attendee_id)
#  index_attendee_options_on_booking_id             (booking_id)
#  index_attendee_options_on_event_id               (event_id)
#  index_attendee_options_on_event_option_id        (event_option_id)
#  index_attendee_options_on_firm_id                (firm_id)
#  index_attendee_options_on_schedule_id            (schedule_id)
#  index_attendee_options_on_stripe_integration_id  (stripe_integration_id)
#
# Foreign Keys
#
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
require 'rails_helper'

RSpec.describe AttendeeOption, type: :model do
  describe 'model setup' do
    it 'relations' do
      should belong_to(:booking)
      should belong_to(:firm)
      should belong_to(:event)
      should belong_to(:event_option)
      should belong_to(:schedule)
    end

    context 'callback' do
      let(:event) { create(:recurring_event) }
      let(:attendee) { create(:attendee, event: event) }
      let(:event_option) { create(:event_option, built_in: true, for_attendee: true, event: event, organizer_price: Money.new(1000)) }
      let(:attendee_option) do
        create(:attendee_option,
               attendee: attendee,
               event_option: event_option,
               booking: nil,
               firm: nil,
               event: nil,
               schedule: nil,
               stripe_integration: nil)
      end

      it 'adjust_prices' do
        expect_any_instance_of(AttendeeOption).to receive(:adjust_prices).and_call_original

        expect(attendee_option.attendee_price).to eq(Money.new(1100))
        expect(attendee_option.organizer_price).to eq(Money.new(1000))
      end

      it 'adjust_event_option_info' do
        expect_any_instance_of(AttendeeOption).to receive(:adjust_event_option_info).and_call_original

        expect(attendee_option.booking).to eq(attendee.booking)
        expect(attendee_option.event).to eq(event_option.event)
        expect(attendee_option.firm).to eq(event_option.event.firm)
        expect(attendee_option.schedule).to eq(attendee.booking.schedule)
        expect(attendee_option.stripe_integration).to eq(event_option.current_stripe_integration)
      end
    end

    it 'monetize' do
      expect(AttendeeOption.monetized_attributes).to eq({ 'attendee_price' => 'attendee_price_cents', 'organizer_price' => 'organizer_price_cents' })
    end
  end
  describe 'attendee option' do
    let!(:event_option) { create(:event_option, for_attendee: false) }
    let(:attendee_option) { create(:attendee_option, event_option: event_option) }

    it 'cant create attendee option, event option is not for attendee' do
      expect { attendee_option }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end
end
