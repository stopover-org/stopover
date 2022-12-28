# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id          :bigint           not null, primary key
#  status      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint
#  schedule_id :bigint
#  trip_id     :bigint
#
# Indexes
#
#  index_bookings_on_event_id     (event_id)
#  index_bookings_on_schedule_id  (schedule_id)
#  index_bookings_on_trip_id      (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
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

    context 'for invalid booking' do
      it 'cant find booked for in event' do
        expect { create(:booking, event: event, booked_for: Time.zone.now) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
      it 'the date is in past' do
        expect { create(:booking, event: event, booked_for: 2.days.ago) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end

    context 'for multiple attendees' do
      let!(:event) { create(:limited_event) }
      let!(:booking) { create(:booking, event: event, booked_for: event.available_dates.last) }

      it 'raise exception when limit was reached' do
        expect { create(:booking, event: event, booked_for: event.available_dates.last) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
