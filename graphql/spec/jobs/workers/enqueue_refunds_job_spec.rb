# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Workers::EnqueueRefundsJob, type: :job do
  describe 'enqueue missed refunds' do
    let(:firm) { create(:firm) }
    let!(:booking) { create(:booking) }
    let!(:refund) { create(:refund, booking: booking, firm: booking.firm, status: 'pending') }

    context 'with successful payments' do
      let!(:payments) { create_list(:payment, 13, total_price: Money.new(50), status: 'successful', booking: booking, balance: booking.firm.balance) }

      it 'successful' do
        Sidekiq::Testing.inline! do
          expect { Workers::EnqueueRefundsJob.perform_now }.to change { Refund.count }.by(2)
          expect(refund.reload.status).to eq('processing')
          expect(refund.related_refunds.map(&:refund_amount).sum(Money.new(0))).to eq(refund.refund_amount)
        end
      end
    end

    context 'with processing payments' do
      let!(:payments) { create_list(:payment, 13, total_price: Money.new(50), status: 'processing', booking: booking, balance: booking.firm.balance) }

      it 'successful' do
        Sidekiq::Testing.inline! do
          expect { Workers::EnqueueRefundsJob.perform_now }.to change { Refund.count }.by(0)
          expect(refund.reload.status).to eq('pending')
        end
      end
    end

    context 'with pending payments' do
      let!(:payments) { create_list(:payment, 13, total_price: Money.new(50), status: 'pending', booking: booking, balance: booking.firm.balance) }

      it 'successful' do
        Sidekiq::Testing.inline! do
          expect { Workers::EnqueueRefundsJob.perform_now }.to change { Refund.count }.by(0)
          expect(refund.reload.status).to eq('pending')
        end
      end
    end

    context 'with cancelled payments' do
      let!(:payments) { create_list(:payment, 13, total_price: Money.new(50), status: 'canceled', booking: booking, balance: booking.firm.balance) }

      it 'successful' do
        Sidekiq::Testing.inline! do
          expect { Workers::EnqueueRefundsJob.perform_now }.to change { Refund.count }.by(0)
        end
      end
    end
  end
end
