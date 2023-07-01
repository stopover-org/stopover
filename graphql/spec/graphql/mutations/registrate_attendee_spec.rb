# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::RegisterAttendee do
  describe 'register attendee' do
    let!(:mutation) do
      "
        mutation RegisterAttendeeMutation($input: RegisterAttendeeInput!) {
          registerAttendee(input: $input) {
            attendee {
              id
              isRegistered
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
      expect(attendee.is_registered).to eq(false)
      subject
      expect(attendee.reload.is_registered).to eq(true)
    end
  end
end
