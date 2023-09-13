# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Workers::EnsureBookingsPaid, type: :job do
  describe 'refund or mark bookings as active if needed' do
    let(:firm) { create(:firm) }
    let(:booking) { create(:booking) }

    context 'mark booking as paid' do
      let!(:payment) do
        create(:payment,
               total_price: booking.attendee_total_price,
               status: 'successful',
               booking: booking,
               balance: firm.balance)
      end
      before { booking.update(status: 'active') }
      it 'successful' do
        Sidekiq::Testing.inline! do
          Workers::EnsureBookingsPaid.perform_now
          expect(booking.reload.status).to eq('paid')
        end
      end
    end

    context 'refund partially' do
      let!(:payment) do
        create(:payment,
               total_price: booking.attendee_total_price + Money.new(200),
               status: 'successful',
               booking: booking,
               balance: firm.balance)
      end
      before { booking.update(status: 'paid') }
      it 'successful' do
        Sidekiq::Testing.inline! do
          Workers::EnsureBookingsPaid.perform_now
          expect(booking.reload.status).to eq('paid')
          expect(booking.refunds.count).to eq(1)
        end
      end
    end

    context 'mark as unpaid' do
      let!(:payment) do
        create(:payment,
               total_price: booking.attendee_total_price - Money.new(200),
               status: 'successful',
               booking: booking,
               balance: firm.balance)
      end
      before { booking.update(status: 'paid') }
      it 'successful' do
        Sidekiq::Testing.inline! do
          Workers::EnsureBookingsPaid.perform_now
          expect(booking.reload.status).to eq('active')
        end
      end
    end
  end
end
