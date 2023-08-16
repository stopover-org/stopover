# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::RegisterAttendee, type: :mutation do
  describe 'register attendee' do
    let!(:mutation) do
      "
        mutation RegisterAttendeeMutation($input: RegisterAttendeeInput!) {
          registerAttendee(input: $input) {
            attendee {
              id
              status
            }
          }
        }
      "
    end

    let!(:attendee) { create(:attendee) }

    subject do
      GraphqlSchema.execute(mutation, variables: {
                              input: {
                                attendeeId: GraphqlSchema.id_from_object(attendee)
                              }
                            })
    end

    it 'is registered' do
      expect(attendee.status).to eq('not_registered')
      subject
      expect(attendee.reload.status).to eq('registered')
    end
  end
end
