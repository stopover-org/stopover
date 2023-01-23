# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateAttendee do
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

    # context '' do
    #   let!(:event) { create(:recurring_event) }
    #   let!(:booking) { create(:booking, event: event) }
    #   let!(:attendee) { create(:attendee, booking: booking) }
    #   let!(:event_option) { create(:for_attendee_event_option, event: event) }
    #   let!(:attendee_option) { create(:attendee_option, event_option: event_option, attendee: attendee) }
    #
    #   subject do
    #     GraphqlSchema.execute(mutation, variables: {
    #                             input: {
    #                               attendeeId: GraphqlSchema.id_from_object(attendee),
    #                               firstName: 'Max',
    #                               lastName: 'Gerasimov',
    #                               email: 'example@mail.com',
    #                               phone: '**** **** ****'
    #                             }
    #                           })
    #   end
    #
    #   it '' do
    #     res = subject.to_h
    #     # expect(attendee.reload.first_name).to eq('Max')
    #   end
    # end
  end
end
