# frozen_string_literal: true

# == Schema Information
#
# Table name: balances
#
#  id                 :bigint           not null, primary key
#  last_payout_at     :datetime
#  total_amount_cents :decimal(, )      default(0.0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  firm_id            :bigint
#
# Indexes
#
#  index_balances_on_firm_id  (firm_id)
#
require 'rails_helper'

RSpec.describe Balance, type: :model do
  describe 'model setup' do
    it 'relations' do
      should have_many(:payments).dependent(:nullify)
      should have_many(:payouts).dependent(:nullify)
      should have_many(:refunds).dependent(:nullify)

      should belong_to(:firm)
    end

    it 'monetize' do
      expect(AttendeeOption.monetized_attributes).to eq({ 'attendee_price' => 'attendee_price_cents', 'organizer_price' => 'organizer_price_cents' })
    end

    context 'instance_methods' do
      context 'without refunds' do
        let!(:event) { create(:recurring_event) }
        let!(:booking) { create(:booking, event: event) }
        let!(:balance) { booking.firm.balance }
        before do
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'pending')
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'processing')
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'successful')
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'canceled')

          create_list(:payout, 2,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'pending')

          create_list(:payout, 2,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'processing')
          create_list(:payout, 1,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'successful')

          create_list(:payout, 2,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'successful')
          create_list(:payout, 1,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'processing')

          create_list(:payout, 2,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'canceled')
        end
        it 'successful_payments' do
          expect(balance.payments.successful.count).to eq(4) # 4000

          expect(balance.successful_payments).to eq(Money.new(4000))
        end

        it 'pending_payments' do
          expect(balance.payments.pending.count).to eq(4) # 4000

          expect(balance.pending_payments).to eq(Money.new(4000))
        end

        it 'processing_payments' do
          expect(balance.payments.processing.count).to eq(4) # 4000

          expect(balance.processing_payments).to eq(Money.new(4000))
        end

        it 'withdrawn_amount' do
          expect(balance.payouts.successful.count).to eq(3) # 900
          expect(balance.payouts.processing.count).to eq(3) # 900

          expect(balance.withdrawn_amount).to eq(Money.new(900 + 900))
        end

        it 'withdrawable_amount' do
          expect(balance.payments.successful.count).to eq(4) # 4000
          expect(balance.payouts.processing.count).to eq(3) # 900
          expect(balance.payouts.successful.count).to eq(3) # 900

          expect(balance.withdrawable_amount).to eq(Money.new(4000 - 900 - 900))
        end
      end

      context 'with refunds' do
        let!(:event) { create(:recurring_event) }
        let!(:booking) { create(:booking, event: event) }
        let!(:balance) { booking.firm.balance }
        before do
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'pending')
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'processing')
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'successful')
          create_list(:payment, 4,
                      total_price: Money.new(1000),
                      booking: booking,
                      status: 'canceled')

          create_list(:payout, 2,
                      total_amount: Money.new(200),
                      firm: booking.firm,
                      status: 'pending')

          create_list(:payout, 2,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'processing')
          create_list(:payout, 1,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'successful')

          create_list(:payout, 2,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'successful')
          create_list(:payout, 1,
                      total_amount: Money.new(300),
                      firm: booking.firm,
                      status: 'processing')

          create_list(:payout, 2,
                      total_amount: Money.new(200),
                      firm: booking.firm,
                      status: 'canceled')

          parent_refund1 = create(:refund,
                                  booking: booking,
                                  refund_amount: 400)

          parent_refund2 = create(:refund,
                                  booking: booking,
                                  refund_amount: 400)

          parent_refund3 = create(:refund,
                                  booking: booking,
                                  refund_amount: 400)

          parent_refund4 = create(:refund,
                                  booking: booking,
                                  refund_amount: 400)

          create_list(:refund, 2,
                      refund_amount: Money.new(50),
                      firm: booking.firm,
                      status: 'pending',
                      payment: Payment.successful.last,
                      parent_refund: parent_refund1)
          create_list(:refund, 2,
                      refund_amount: Money.new(50),
                      firm: booking.firm,
                      status: 'processing',
                      payment: Payment.successful.last,
                      parent_refund: parent_refund2)
          create_list(:refund, 2,
                      refund_amount: Money.new(50),
                      firm: booking.firm,
                      status: 'successful',
                      payment: Payment.successful.last,
                      parent_refund: parent_refund3)
          create_list(:refund, 2,
                      refund_amount: Money.new(50),
                      firm: booking.firm,
                      status: 'canceled',
                      payment: Payment.successful.last,
                      parent_refund: parent_refund4)
        end
        it 'successful_payments' do
          expect(balance.payments.successful.count).to eq(4) # 4000
          expect(balance.refunds
                        .joins(:payment).where(payment: { status: %w[processing successful] })
                        .where.not(refund_id: nil)
                        .where(status: %w[successful processing]).count).to eq(4) # 200

          expect(balance.successful_payments).to eq(Money.new(4000 - 200))
        end

        it 'pending_payments' do
          expect(balance.pending_payments).to eq(Money.new(4000))
        end

        it 'processing_payments' do
          expect(balance.payments.processing.count).to eq(4) # 4000
          expect(balance.payouts.processing.count).to eq(3) # 900
          expect(balance.payouts.successful.count).to eq(3) # 900

          expect(balance.processing_payments).to eq(Money.new(4000))
        end

        it 'withdrawn_amount' do
          expect(balance.withdrawn_amount).to eq(Money.new(4000 - 900 - 900 - 400))
        end

        it 'withdrawable_amount' do
          expect(balance.payments.successful.count).to eq(4) # 4000
          expect(balance.payouts.successful.count).to eq(3) # 900
          expect(balance.payouts.processing.count).to eq(3) # 900
          expect(balance.refunds
                        .joins(:payment).where(payment: { status: %w[processing successful] })
                        .where.not(refund_id: nil)
                        .where(status: %w[successful processing]).count).to eq(4) # 200

          expect(balance.withdrawable_amount).to eq(Money.new(4000 - 900 - 900 - 200))
        end
      end

      context 'payout!' do
        let!(:balance) { create(:balance, total_amount: Money.new(10_000)) }
        before do
          create_list(:payment, 10, total_price: Money.new(1000), balance: balance, status: 'successful')
        end

        it 'less than amount' do
          Timecop.freeze(Time.current) do
            Sidekiq::Testing.inline! do
              expect(balance.withdrawable_amount).to eq(Money.new(10_000))
              expect { balance.payout!(Money.new(9555)) }.to change { Payout.count }.by(1)
              expect(Payout.last.total_amount).to eq(Money.new(9555))
              expect(Payout.last.status).to eq('processing')
              expect(balance.total_amount).to eq(Money.new(445))
              expect(balance.withdrawable_amount).to eq(Money.new(445))
              expect(balance.withdrawn_amount).to eq(Money.new(9555))
              expect(balance.last_payout_at).to eq(Time.current)
            end
          end
        end

        it 'exact amount' do
          Timecop.freeze(Time.current) do
            Sidekiq::Testing.inline! do
              expect(balance.withdrawable_amount).to eq(Money.new(10_000))
              expect { balance.payout!(Money.new(10_000)) }.to change { Payout.count }.by(1)
              expect(Payout.last.total_amount).to eq(Money.new(10_000))
              expect(Payout.last.status).to eq('processing')
              expect(balance.total_amount).to eq(Money.new(0))
              expect(balance.withdrawable_amount).to eq(Money.new(0))
              expect(balance.withdrawn_amount).to eq(Money.new(10_000))
              expect(balance.last_payout_at).to eq(Time.current)
            end
          end
        end

        it 'more than amount' do
          Timecop.freeze(Time.current) do
            Sidekiq::Testing.inline! do
              expect(balance.withdrawable_amount).to eq(Money.new(10_000))
              expect { balance.payout!(Money.new(10_100)) }.to change { Payout.count }.by(0)
              expect(balance.total_amount).to eq(Money.new(10_000))
              expect(balance.withdrawable_amount).to eq(Money.new(10_000))
              expect(balance.withdrawn_amount).to eq(Money.new(0))
              expect(balance.last_payout_at).to eq(nil)
            end
          end
        end
      end
    end
  end
end
