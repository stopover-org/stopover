# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  payment_type               :string
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  firm_id                    :bigint
#  payment_intent_id          :string
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_balance_id  (balance_id)
#  index_payments_on_booking_id  (booking_id)
#  index_payments_on_firm_id     (firm_id)
#
require 'rails_helper'

RSpec.describe Payment, type: :model do
  describe 'model setup' do
    it 'relations' do
      should have_many(:payment_connections).dependent(:destroy)
      should have_many(:refunds).dependent(:nullify)
      should have_many(:payouts).dependent(:nullify)

      should have_many(:stripe_integrations).through(:payment_connections)

      should belong_to(:booking)
      should belong_to(:firm)
      should belong_to(:balance)
    end

    it 'enums' do
      should define_enum_for(:provider).with_values(stripe: 'stripe')
                                       .backed_by_column_of_type(:string)
      should define_enum_for(:payment_type).with_values(full_amount: 'full_amount',
                                                        deposit: 'deposit')
                                           .backed_by_column_of_type(:string)
    end

    it 'monetize' do
      expect(Payment.monetized_attributes).to eq({ 'total_price' => 'total_price_cents' })
    end

    context 'callbacks' do
      let!(:booking) { create(:booking) }
      let(:payment) do
        create(:payment,
               booking: booking,
               total_price: Money.new(0))
      end

      it 'set_price' do
        expect_any_instance_of(Payment).to receive(:adjust_price).and_call_original
        expect(payment.total_price).to eq(booking.attendee_total_price)
      end

      it 'adjust_firm' do
        expect_any_instance_of(Payment).to receive(:adjust_firm).and_call_original
        expect(payment.firm).to eq(booking.firm)
        expect(payment.balance).to eq(booking.firm.balance)
      end
    end
  end

  describe 'instance_methods' do
    let!(:payment) { create(:payment_in_process, booking: create(:booking), total_price: Money.new(250)) }
    it 'first create' do
      expect(payment.total_price.cents).to eq(250)
    end

    it 'success and top up balance' do
      expect(payment.balance.total_amount).to eq(Money.new(0))
      payment.success!
      expect(payment.balance.reload.total_amount).to eq(Money.new(250))
    end

    context 'balance amount' do
      let!(:payment) do
        create(:payment,
               booking: create(:booking), total_price: Money.new(10_000))
      end
      shared_examples :check_balance_amount do |amount|
        it 'balance_amount' do
          expect(payment.balance_amount).to eq(amount)
        end
      end
      shared_examples :check_refunds_amount do |amount|
        it 'refunds_amount' do
          expect(payment.refunds_amount).to eq(amount)
        end
      end
      shared_examples :check_payouts_amount do |amount|
        it 'payouts_amount' do
          expect(payment.payouts_amount).to eq(amount)
        end
      end
      context 'pending' do
        context 'with refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'pending',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          include_examples :check_balance_amount, Money.new(10_000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(0)
        end
        context 'with payouts' do
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'pending')
          end
          include_examples :check_balance_amount, Money.new(10_000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(0)
        end
        context 'with payouts and refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'pending',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'pending')
          end
          include_examples :check_balance_amount, Money.new(10_000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(0)
        end
      end
      context 'processing' do
        context 'with refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'processing',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          include_examples :check_balance_amount, Money.new(9000)
          include_examples :check_refunds_amount, Money.new(1000)
          include_examples :check_payouts_amount, Money.new(0)
        end
        context 'with payouts' do
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'processing')
          end
          include_examples :check_balance_amount, Money.new(9000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(1000)
        end
        context 'with payouts and refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'processing',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'processing')
          end
          include_examples :check_balance_amount, Money.new(8000)
          include_examples :check_refunds_amount, Money.new(1000)
          include_examples :check_payouts_amount, Money.new(1000)
        end
      end
      context 'successful' do
        context 'with refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'successful',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          include_examples :check_balance_amount, Money.new(9000)
          include_examples :check_refunds_amount, Money.new(1000)
          include_examples :check_payouts_amount, Money.new(0)
        end
        context 'with payouts' do
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'successful')
          end
          include_examples :check_balance_amount, Money.new(9000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(1000)
        end
        context 'with payouts and refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'successful',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'successful')
          end
          include_examples :check_balance_amount, Money.new(8000)
          include_examples :check_refunds_amount, Money.new(1000)
          include_examples :check_payouts_amount, Money.new(1000)
        end
      end
      context 'cancelled' do
        context 'with refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'canceled',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          include_examples :check_balance_amount, Money.new(10_000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(0)
        end
        context 'with payouts' do
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'canceled')
          end
          include_examples :check_balance_amount, Money.new(10_000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(0)
        end
        context 'with payouts and refunds' do
          let!(:refund) do
            create(:refund,
                   payment: payment,
                   firm: payment.firm,
                   refund_amount: Money.new(1000),
                   status: 'canceled',
                   parent_refund: create(:refund, refund_amount: Money.new(1000)))
          end
          let!(:payout) do
            create(:payout,
                   payment: payment,
                   total_amount: Money.new(1000),
                   status: 'canceled')
          end
          include_examples :check_balance_amount, Money.new(10_000)
          include_examples :check_refunds_amount, Money.new(0)
          include_examples :check_payouts_amount, Money.new(0)
        end
      end
    end
  end
end
