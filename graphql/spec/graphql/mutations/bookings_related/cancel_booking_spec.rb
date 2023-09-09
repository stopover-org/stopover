# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::BookingsRelated::CancelBooking, type: :mutation do
  let(:mutation) do
    "
      mutation CancelBooking($input: CancelBookingInput!) {
        cancelBooking(input: $input) {
          booking {
            id
            status
            schedule {
              scheduledFor
            }
          }
          trip {
            id
          }

          errors
          notification
        }
      }
    "
  end
  let!(:booking) { create(:booking) }
  let(:current_user) { booking.user }

  let(:input) do
    { bookingId: GraphqlSchema.id_from_object(booking) }
  end

  subject do
    GraphqlSchema.execute(mutation, variables: {
                            input: input
                          }, context: { current_user: current_user })
  end

  shared_examples :successful do
    it 'successful' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)

      expect(booking.attendees.count).to eq(1)
      expect(result.dig(:data, :cancelBooking, :booking, :id)).to eq(GraphqlSchema.id_from_object(booking))
      expect(result.dig(:data, :cancelBooking, :trip, :id)).to eq(GraphqlSchema.id_from_object(booking.trip))
      expect(result.dig(:data, :cancelBooking, :booking, :status)).to eq('cancelled')
      expect(result.dig(:data, :cancelBooking, :notification)).to eq('Booking cancelled!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)
      expect(result.dig(:data, :cancelBooking, :booking)).to be_nil
      expect(result.dig(:data, :cancelBooking, :errors)).to include(error)
    end
  end

  context 'cancel booking' do
    context 'as active user' do
      include_examples :successful
    end

    context 'as manager' do
      let(:current_user) { booking.firm.accounts.last.user }
      include_examples :successful
    end

    context 'permissions' do
      context 'for past booking' do
        before { booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Event past'
      end

      context 'for cancelled booking' do
        before { booking.update(status: 'cancelled') }
        include_examples :fail, 'Booking was cancelled'
      end

      context 'without user' do
        let(:current_user) { nil }
        include_examples :fail, 'You are not authorized'
      end

      context 'as inactive user' do
        before { booking.user.update(status: 'inactive') }
        include_examples :fail, 'You are not authorized'
      end

      context 'as manager of another company' do
        let!(:current_user) { create(:firm).accounts.last.user }
        include_examples :fail, 'You are not authorized'
      end
    end
  end
end
