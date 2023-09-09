# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::DeregisterAttendee, type: :mutation do
  let(:mutation) do
    "
      mutation RemoveAttendee($input: RemoveAttendeeInput!) {
        removeAttendee(input: $input) {
          attendee {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let!(:attendee) { create(:attendee) }
  let(:current_user) { attendee.booking.firm.accounts.last.user }

  let(:input) do
    { attendeeId: GraphqlSchema.id_from_object(attendee) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)

      expect(result.dig(:data, :removeAttendee, :attendee, :id)).to eq(GraphqlSchema.id_from_object(attendee))
      expect(result.dig(:data, :removeAttendee, :attendee, :status)).to eq('removed')
      expect(result.dig(:data, :removeAttendee, :notification)).to eq('Attendee was removed!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Attendee.count }.by(0)
      expect(result.dig(:data, :removeAttendee, :attendee)).to be_nil
      expect(result.dig(:data, :removeAttendee, :errors)).to include(error)
    end
  end

  context 'deregister attendee' do
    context 'as manager' do
      context 'for registered attendee' do
        before { attendee.update(status: 'registered') }
        include_examples :successful
      end

      context 'for deregistered attendee' do
        include_examples :successful
      end
    end

    context 'permissions' do
      context 'for removed attendee' do
        before { attendee.update(status: 'removed') }
        include_examples :fail, 'Attendee was removed already'
      end

      context 'for past booking' do
        before { attendee.booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for cancelled booking' do
        before { attendee.booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking was cancelled'
      end

      context 'as booking attendee' do
        let(:current_user) { attendee.booking.user }
        include_examples :fail, 'You are not authorized'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
