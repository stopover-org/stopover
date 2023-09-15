# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Stopover::AttendeeManagement::AddAttendeeService do
  describe 'add attendee' do
    let!(:booking) { create(:booking) }
    let!(:user) { booking.user }
    let!(:service) { Stopover::AttendeeManagement::AddAttendeeService.new(booking, user) }

    context 'for active booking' do
      before { booking.update(status: 'active') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('active')
          expect(booking.attendees.count).to eq(1)
          service.perform
          expect(booking.reload.status).to eq('active')
          expect(booking.attendees.count).to eq(2)
          expect(booking.left_to_pay_price).to eq(booking.event.attendee_price_per_uom * 2)
        end
      end
    end

    context 'for paid booking' do
      before { booking.update(status: 'paid') }
      let!(:payment) { create(:payment, total_price: booking.attendee_total_price, booking: booking, balance: booking.firm.balance, status: 'successful') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('paid')
          expect(booking.attendees.count).to eq(1)
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          service.perform
          expect(booking.reload.status).to eq('active')
          expect(booking.attendees.count).to eq(2)
          expect(booking.left_to_pay_price).to eq(booking.event.attendee_price_per_uom)
        end
      end
    end

    context 'for cancelled booking' do
      before { booking.update(status: 'cancelled') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('cancelled')
          expect(booking.attendees.count).to eq(1)
          service.perform
          expect(booking.reload.status).to eq('cancelled')
          expect(booking.attendees.count).to eq(1)
        end
      end
    end
  end
end
