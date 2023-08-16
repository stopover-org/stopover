# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::UpdateBooking, type: :mutation do
  describe 'mutation update booking' do
    let!(:mutation) do
      "
        mutation UpdateBooking($input: UpdateBookingInput!) {
          updateBooking(input: $input) {
            booking {
              id
              bookedFor
              status
            }
          }
        }
      "
    end

    let!(:event) { create(:recurring_event) }
    let!(:booking) { create(:booking, schedule: event.schedules.first, event: event) }
    let!(:booking2) { create(:booking, schedule: event.schedules.second, event: event) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                bookingId: GraphqlSchema.id_from_object(booking),
                                bookedFor: booking2.schedule.scheduled_for.iso8601,
                                status: 'active'
                              }
                            })
    end

    it 'scheduled on the same date' do
      expect(event).not_to be_nil
      expect(booking.schedule).not_to eq(booking2.schedule)
      subject
      expect(booking.reload.schedule).to eq(booking2.reload.schedule)
    end

    context 'cannot be scheduled on the same date, no place available' do
      let!(:event) { create(:recurring_event, max_attendees: 3) }
      let!(:booking) { create(:booking, schedule: event.schedules.first, event: event) }
      let!(:booking2) { create(:booking, schedule: event.schedules.second, event: event) }
      let!(:attendees) { create_list(:attendee, 2, booking: booking) }

      it 'booking schedule did not changed' do
        expect(booking.attendees.count).to eq(3)
        expect(booking2.attendees.count).to eq(1)
        expect { subject }.not_to change(booking, :schedule)
      end
    end

    context 'can be booked for this date' do
      let!(:event) { create(:recurring_event, max_attendees: 4) }
      let!(:booking) { create(:booking, schedule: event.schedules.first, event: event) }
      let!(:booking2) { create(:booking, schedule: event.schedules.second, event: event) }
      let!(:attendees) { create_list(:attendee, 2, booking: booking) }

      it 'attendee count eq to max attendees' do
        expect(booking.attendees.count).to eq(3)
        expect(booking2.attendees.count).to eq(1)
        res = subject
        expect(booking.reload.attendees.count + booking2.reload.attendees.count).to eq(event.max_attendees)
        expect(booking.reload.schedule.scheduled_for).to eq(booking2.reload.schedule.scheduled_for)
      end
    end
  end
end
