# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::TripsRelated::CancelTrip, type: :mutation do
  let(:mutation) do
    "
      mutation CancelTrip($input: CancelTripInput!) {
        cancelTrip(input: $input) {
          trip {
            id
            status
            bookings {
              status
            }
          }

          errors
          notification
        }
      }
    "
  end
  let!(:booking) { create(:booking) }
  let!(:trip) { booking.trip }
  let(:current_user) { booking.user }

  let(:input) do
    { tripId: GraphqlSchema.id_from_object(trip) }
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
      expect(result.dig(:data, :cancelTrip, :trip, :id)).to eq(GraphqlSchema.id_from_object(booking.trip))
      expect(result.dig(:data, :cancelTrip, :trip, :status)).to eq('cancelled')
      expect(result.dig(:data, :cancelTrip, :trip, :bookings, 0, :status)).to eq('cancelled')
      expect(result.dig(:data, :cancelTrip, :notification)).to eq('Trip cancelled!')
    end
  end

  shared_examples :fail do |error|
    it 'fails' do
      result = nil
      expect { result = subject.to_h.deep_symbolize_keys }.to change { Booking.count }.by(0)
      expect(result.dig(:data, :cancelTrip, :trip)).to be_nil
      expect(result.dig(:data, :cancelTrip, :errors)).to include(error)
    end
  end

  context 'cancel booking' do
    context 'as active user' do
      include_examples :successful
    end

    context 'permissions' do
      context 'for past booking' do
        before { booking.schedule.update(scheduled_for: 5.days.ago) }
        include_examples :fail, 'Trip cannot be cancelled'
      end

      context 'for cancelled trip' do
        before { trip.update(status: 'cancelled') }
        include_examples :fail, 'Trip cannot be cancelled'
      end

      context 'for paid booking' do
        before { booking.update(status: 'paid') }
        include_examples :fail, 'Trip cannot be cancelled'
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
