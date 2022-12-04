# frozen_string_literal: true

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
      expect(booking.booking_options.first.attendee_cost_cents).to eq(440)
      expect(booking.booking_options.first.organizer_cost_cents).to eq(400)
      expect(booking.attendees.first.attendee_options.first.attendee_cost_cents).to eq(440)
      expect(booking.attendees.first.attendee_options.first.organizer_cost_cents).to eq(400)
    end
    it do
      event.event_options.first.update!(organizer_cost_cents: 500)
      event.event_options.last.update!(organizer_cost_cents: 500)
      expect(booking.booking_options.first.reload.attendee_cost_cents).to eq(550)
      expect(booking.booking_options.first.organizer_cost_cents).to eq(500)
      expect(booking.attendees.first.attendee_options.first.attendee_cost_cents).to eq(550)
      expect(booking.attendees.first.attendee_options.first.organizer_cost_cents).to eq(500)
    end

    context 'for invalid booking' do
      it 'cant find booked for in event' do
        expect { create(:booking, event: event, booked_for: DateTime.now) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
      it 'the date is in past' do
        expect { create(:booking, event: event, booked_for: DateTime.now - 2.days) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
