# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateAttendee do
  describe '' do
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

    it '' do
      subject
      # expect(attendee.reload.first_name).to eq('Max')
    end

    context '' do
      let!(:event) { create(:recurring_event) }
      let!(:booking) { create(:booking, event: event) }
      let!(:attendee) { create(:attendee, booking: booking) }
      let!(:attendee_option) { create(:attendee_option, attendee: attendee) }

      subject do
        GraphqlSchema.execute(mutation, variables: {
                                input: {
                                  attendeeId: GraphqlSchema.id_from_object(attendee_option.attendee),
                                 firstName: 'Max',
                                   lastName: 'Gerasimov',
                                   email: 'example@mail.com',
                                   phone: '**** **** ****'
                                }
                              })
      end

      it '' do
        res = subject.to_h
        # expect(attendee.reload.first_name).to eq('Max')
      end
    end
  end
end
