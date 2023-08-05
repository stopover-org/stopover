# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id                    :bigint           not null, primary key
#  status                :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#  trip_id               :bigint
#
# Indexes
#
#  index_bookings_on_event_id               (event_id)
#  index_bookings_on_schedule_id            (schedule_id)
#  index_bookings_on_stripe_integration_id  (stripe_integration_id)
#  index_bookings_on_trip_id                (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
require 'rails_helper'

RSpec.describe Booking, type: :model do
  describe 'booking' do
    let!(:event) { create(:recurring_event, event_options: [create(:built_in_attendee_option), create(:built_in_event_option)]) }
    let!(:booking) { create(:booking, event: event) }

    it 'has one attendee' do
      expect(booking.attendees.count).to eq(1)
    end

    it 'attendee has one attendee option' do
      expect(booking.attendees.first.attendee_options.count).to eq(1)
      expect(booking.booking_options.count).to eq(1)
    end

    it do
      expect(booking.booking_options.first.attendee_price_cents).to eq(440)
      expect(booking.booking_options.first.organizer_price_cents).to eq(400)
      expect(booking.attendees.first.attendee_options.first.attendee_price_cents).to eq(440)
      expect(booking.attendees.first.attendee_options.first.organizer_price_cents).to eq(400)
    end

    it do
      event.event_options.first.update!(organizer_price_cents: 500)
      event.event_options.last.update!(organizer_price_cents: 500)
      expect(booking.booking_options.first.reload.attendee_price_cents).to eq(550)
      expect(booking.booking_options.first.organizer_price_cents).to eq(500)
      expect(booking.attendees.first.attendee_options.first.attendee_price_cents).to eq(550)
      expect(booking.attendees.first.attendee_options.first.organizer_price_cents).to eq(500)
    end
  end
  context 'methods' do
    let!(:event) { create(:recurring_event) }
    let!(:booking) { create(:booking, event: event) }
    let!(:booking_option) { create(:booking_option, booking: booking) }

    it 'sum of prices' do
      expect(booking.attendee_total_price.cents).to eq(990)
      expect(booking.organizer_total_price.cents).to eq(900)
    end
  end
end
