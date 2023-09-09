# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::ChangeAttendeeOptionAvailability, type: :mutation do
  let(:mutation) do
    "
      mutation ChangeAttendeeOptionAvailability($input: ChangeAttendeeOptionAvailabilityInput!) {
        changeAttendeeOptionAvailability(input: $input) {
          attendeeOption {
            id
            status
          }

          errors
          notification
        }
      }
    "
  end
  let!(:attendee_option) { create(:attendee_option) }
  let(:current_user) { attendee_option.booking.firm.accounts.last.user }

  let(:input) do
    { attendeeOptionId: GraphqlSchema.id_from_object(attendee_option) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do |status, message|
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { AttendeeOption.count }.by(0)

      expect(result.dig(:data, :changeAttendeeOptionAvailability, :attendeeOption, :id)).to eq(GraphqlSchema.id_from_object(attendee_option))
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :attendeeOption, :status)).to eq(status)
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :notification)).to eq(message)
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { AttendeeOption.count }.by(0)
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :attendeeOption)).to be_nil
      expect(result.dig(:data, :changeAttendeeOptionAvailability, :errors)).to include(error)
    end
  end

  context 'add attendee' do
    context 'unavailable to available' do
      context 'as manager' do
        before { attendee_option.update(status: 'not_available') }
        include_examples :successful, 'available', 'Attendee Option is available from now'
      end
    end

    context 'available to unavailable' do
      context 'as manager' do
        before { attendee_option.update(status: 'available') }
        include_examples :successful, 'not_available', 'Attendee Option is unavailable from now'
      end
    end

    context 'permissions' do
      context 'for past booking' do
        before { attendee_option.booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for cancelled booking' do
        before { attendee_option.booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking was cancelled'
      end

      context 'as booking attendee company' do
        let(:current_user) { attendee_option.booking.user }
        include_examples :fail, 'You are not authorized'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end