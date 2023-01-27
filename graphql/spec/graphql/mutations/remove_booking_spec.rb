# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Attendee, type: :model do
  describe 'remove booking' do
    let!(:mutation) do
      "
        mutation RemoveBookingMutation($input: RemoveBookingInput!) {
          removeBooking(input: $input) {
            booking {
              id
            }
          }
        }
      "
    end

    let!(:event) { create(:recurring_event) }
    let!(:event_option) { create(:for_attendee_event_option, event: event) }
    let!(:booking) { create(:booking, event: event) }
    let!(:attendee) { create(:attendee, booking: booking) }
    let!(:attendee_option) { create(:attendee_option, attendee: attendee, event_option: event_option) }
    let!(:booking_option) { create(:booking_option, booking: booking, event_option: event_option) }

    subject do
      GraphqlSchema.execute(mutation,
                            variables: {
                              input: {
                                bookingId: GraphqlSchema.id_from_object(booking)
                              }
                            })
    end
    it 'destroy booking' do
      expect { subject }.to change { Booking.count }.by(-1)
      expect(Attendee.count).to eq(0)
      expect(AttendeeOption.count).to eq(0)
      expect(BookingOption.count).to eq(0)
    end
  end
end
