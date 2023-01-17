# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateBooking do
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
    let!(:booking) { create(:booking, schedule: event.schedules.first) }
    let!(:booking2) { create(:booking, schedule: event.schedules.second) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                bookingId: GraphqlSchema.id_from_object(booking),
                                bookedFor: booking2.schedule.scheduled_for.to_s,
                                status: 'active'
                              }
                            })
    end

    it 'scheduled on the same date' do
      expect(event).not_to be_nil
      expect(booking.schedule.scheduled_for).not_to eq(booking2.schedule.scheduled_for)
      res = subject
      expect(booking.schedule.scheduled_for).to eq(booking2.schedule.scheduled_for)
    end

    context 'cannot be scheduled on the same date, no place available' do
      let!(:event) { create(:recurring_event, max_attendees: 3) }
      let!(:booking) { create(:booking, schedule: event.schedules.first) }
      let!(:booking2) { create(:booking, schedule: event.schedules.second) }
      let!(:attendees) { create_list(:attendee, 2, booking: booking) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  bookingId: GraphqlSchema.id_from_object(booking),
                                  bookedFor: booking2.schedule.scheduled_for.to_s,
                                  status: 'active'
                                }
                              })
      end

      it '' do
        expect(booking.attendees.count).to eq(3)
        expect(booking2.attendees.count).to eq(1)
        res = subject
        expect(res['data']['updateBooking']).to eq(nil)
        expect(res['errors']).not_to be_nil
      end
    end

    context 'can be booked for this date' do
      let!(:event) { create(:recurring_event, max_attendees: 4) }
      let!(:booking) { create(:booking, schedule: event.schedules.first) }
      let!(:booking2) { create(:booking, schedule: event.schedules.second) }
      let!(:attendees) { create_list(:attendee, 2, booking: booking) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  bookingId: GraphqlSchema.id_from_object(booking),
                                  bookedFor: booking2.schedule.scheduled_for.to_s,
                                  status: 'active'
                                }
                              })
      end

      it '' do
        expect(booking.attendees.count).to eq(3)
        expect(booking2.attendees.count).to eq(1)
        res = subject
        expect(booking.attendees.count + booking2.attendees.count).to eq(event.max_attendees)
        expect(booking.schedule.scheduled_for).to eq(booking2.schedule.scheduled_for)
      end
    end
  end
end
