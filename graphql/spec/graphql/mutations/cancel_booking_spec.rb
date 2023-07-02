# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Attendee, type: :model do
  describe 'cancel booking' do
    let!(:mutation) do
      "
        mutation CancelBookingMutation($input: CancelBookingInput!) {
          cancelBooking(input: $input) {
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
                            },
                            context: { current_user: booking.user })
    end
    it 'destroy booking' do
      subject
      expect(booking.reload.status).to eq('cancelled')
      expect(Attendee.count).to eq(2)
      expect(AttendeeOption.count).to eq(1)
      expect(BookingOption.count).to eq(1)
    end
  end
end
