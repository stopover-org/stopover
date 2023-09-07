# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Stopover::CurrentTripService, type: :service do
  describe 'without trip' do
    let!(:user) { create(:account).user }
    let!(:service) { Stopover::CurrentTripService.new(user: user) }

    it 'create trip' do
      expect { service.get_current_trip(DateTime.now + 2.days) }.to change { Trip.count }.by(1)
    end

    context 'for existing trips' do
      let!(:trip) { create(:booking, account: user.account).trip }

      it 'in range' do
        expect(service.get_current_trip(trip.bookings
                                            .first
                                            .schedule
                                            .scheduled_for + 3.days)).to eq(trip)
      end

      it 'out of range' do
        expect(service.get_current_trip(trip.bookings
                                            .first
                                            .schedule
                                            .scheduled_for + 23.days)).not_to eq(trip)
      end
    end
  end
end
