# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  fee_cents                  :decimal(, )      default(0.0)
#  payment_type               :string
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  booking_id                 :bigint
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_booking_id  (booking_id)
#
require 'rails_helper'

RSpec.describe Payment do
  describe 'payment' do
    let!(:balance) { create(:balance) }
    let!(:payment) { create(:payment_in_process, balance: balance, total_price: Money.new(250)) }
    it 'first create' do
      expect(payment).to receive(:calculate_fee).never
      payment.update!(total_price: Money.new(350))

      expect(payment.total_price.cents).to eq(350)
      expect(payment.fee.cents).to eq(50)
    end

    it 'success and top up balance' do
      expect(payment).to receive(:top_up_balance)
      expect(payment.balance.total_amount).to eq(Money.new(250))

      payment.success!
    end
  end
end
