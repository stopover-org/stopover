# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookEvent do
  describe 'mutation book event' do
    let!(:mutation) do
      "
        mutation BookEvent($input: BookEventInput!){
          bookEvent(input:$input){
            booking {
              id
              bookedFor
              attendees {
                id
              }
            }
          }
        }
      "
    end
    let!(:event) { create(:recurring_event) }
    let!(:user) { create(:account).user }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                eventId: GraphqlSchema.id_from_object(event),
                                bookedFor: event.available_dates.last,
                                attendeesCount: 1
                              }
                            }, context: { current_user: user })
    end

    it 'booking was created' do
      expect { subject }.to change { Booking.count }.by(1)
    end

    it 'attendee was created' do
      expect { subject }.to change { Attendee.count }.by(1)
    end
  end
end
