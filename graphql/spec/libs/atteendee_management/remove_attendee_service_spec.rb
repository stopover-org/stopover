# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Stopover::AttendeeManagement::RemoveAttendeeService do
  describe 'add attendee' do
    let!(:booking) { create(:booking, attendees: create_list(:attendee, 2)) }
    let!(:attendee) { booking.attendees.last }
    let!(:user) { booking.user }
    let!(:service) { Stopover::AttendeeManagement::RemoveAttendeeService.new(attendee, user) }

    context 'for active booking' do
      before { booking.update(status: 'active') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('active')
          expect(booking.attendees.where.not(status: :removed).count).to eq(2)
          service.perform
          expect(booking.reload.status).to eq('active')
          expect(booking.attendees.where.not(status: :removed).count).to eq(1)
        end
      end
    end

    context 'for paid booking' do
      before { booking.update(status: 'paid') }
      let!(:payment) { create(:payment, total_price: booking.attendee_total_price, booking: booking, balance: booking.firm.balance, status: 'successful') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('paid')
          expect(booking.attendees.where.not(status: :removed).count).to eq(2)
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          service.perform
          expect(booking.reload.status).to eq('paid')
          expect(booking.attendees.where.not(status: :removed).count).to eq(1)
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          expect(booking.refunds.count).to eq(2)
        end
      end
    end

    context 'for partially paid booking' do
      before { booking.update(status: 'paid') }
      let!(:payment) { create(:payment, total_price: booking.attendee_total_price / 2, booking: booking, balance: booking.firm.balance, status: 'successful') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('paid')
          expect(booking.attendees.where.not(status: :removed).count).to eq(2)
          expect(booking.left_to_pay_price).to eq(booking.event.attendee_price_per_uom)
          service.perform
          expect(booking.reload.status).to eq('paid')
          expect(booking.attendees.where.not(status: :removed).count).to eq(1)
          expect(booking.left_to_pay_price).to eq(Money.new(0))
          expect(booking.refunds.count).to eq(0)
        end
      end
    end

    context 'for cancelled booking' do
      before { booking.update(status: 'cancelled') }
      it 'perform' do
        Sidekiq::Testing.inline! do
          expect(booking.status).to eq('cancelled')
          expect(booking.attendees.count).to eq(2)
          service.perform
          expect(booking.reload.status).to eq('cancelled')
          expect(booking.attendees.count).to eq(2)
        end
      end
    end
  end
end
