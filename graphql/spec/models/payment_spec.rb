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
#  withdrawn_at               :datetime
#  withdrawn_cents            :bigint           default(0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  payment_intent_id          :string
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_balance_id  (balance_id)
#  index_payments_on_booking_id  (booking_id)
#
require 'rails_helper'

RSpec.describe Payment, type: :model do
  describe 'payment' do
    let!(:balance) { create(:balance) }
    let!(:payment) { create(:payment_in_process, balance: balance, total_price: Money.new(250)) }
    it 'first create' do
      expect(payment.total_price.cents).to eq(350)
    end

    it 'success and top up balance' do
      expect(payment).to receive(:top_up_balance)
      expect(payment.balance.total_amount).to eq(Money.new(250))

      payment.success!
    end
  end
end
