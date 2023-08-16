# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::UpdateAttendee, type: :mutation do
  describe 'update attendee' do
    let!(:mutation) do
      "
        mutation UpdateAttendeeMutation($input: UpdateAttendeeInput!) {
          updateAttendee(input: $input) {
            attendee {
              id
              email
              firstName
              lastName
              phone
            }
          }
        }
			"
    end

    let!(:event) { create(:recurring_event) }
    let!(:booking) { create(:booking, event: event) }
    let!(:attendee) { create(:attendee, booking: booking) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                attendeeId: GraphqlSchema.id_from_object(attendee),
                                firstName: 'Max',
                                lastName: 'Gerasimov',
                                email: 'example@mail.com',
                                phone: '**** **** ****'
                              }
                            })
    end

    it 'attendee is updating' do
      subject
      expect(attendee.reload.first_name).to eq('Max')
      expect(attendee.reload.last_name).to eq('Gerasimov')
      expect(attendee.reload.email).to eq('example@mail.com')
      expect(attendee.reload.phone).to eq('**** **** ****')
    end

    context 'adding attendee options' do
      let!(:event) { create(:recurring_event) }
      let!(:booking) { create(:booking, event: event) }
      let!(:attendee) { create(:attendee, booking: booking) }
      let!(:attendee_option1) { create(:attendee_option, attendee: attendee) }
      let!(:attendee_option2) { create(:attendee_option, attendee: attendee) }

      let!(:event_option) { create(:for_attendee_event_option, event: event) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  attendeeId: GraphqlSchema.id_from_object(attendee),
                                  eventOptionIds: [
                                    GraphqlSchema.id_from_object(event_option),
                                    GraphqlSchema.id_from_object(attendee_option1.event_option),
                                    GraphqlSchema.id_from_object(attendee_option2.event_option)
                                  ],
                                  firstName: 'Max',
                                  lastName: 'Gerasimov',
                                  email: 'example@mail.com',
                                  phone: '**** **** ****'
                                }
                              })
      end

      it 'new event option added' do
        expect(attendee.attendee_options.first).to eq(attendee_option1)
        expect(attendee.attendee_options.second).to eq(attendee_option2)
        subject
        expect(attendee.reload.attendee_options.first.event_option).to eq(event_option)
      end
    end

    context 'deleting attendee options' do
      let!(:event) { create(:recurring_event) }
      let!(:booking) { create(:booking, event: event) }
      let!(:attendee) { create(:attendee, booking: booking) }
      let!(:attendee_option1) { create(:attendee_option, attendee: attendee) }
      let!(:attendee_option2) { create(:attendee_option, attendee: attendee) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  attendeeId: GraphqlSchema.id_from_object(attendee),
                                  eventOptionIds: [],
                                  firstName: 'Max',
                                  lastName: 'Gerasimov',
                                  email: 'example@mail.com',
                                  phone: '**** **** ****'
                                }
                              })
      end

      it 'attendee options removed' do
        expect(attendee.attendee_options.first).to eq(attendee_option1)
        expect(attendee.attendee_options.second).to eq(attendee_option2)
        subject
        expect(attendee.attendee_options.reload.count).to eq(0)
      end
    end
  end
end
