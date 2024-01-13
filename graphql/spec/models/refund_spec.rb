# frozen_string_literal: true

# == Schema Information
#
# Table name: refunds
#
#  id                             :bigint           not null, primary key
#  penalty_amount_cents           :decimal(, )      default(0.0), not null
#  refund_amount_cents            :decimal(, )      default(0.0), not null
#  status                         :string           default("pending"), not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  account_id                     :bigint
#  balance_id                     :bigint
#  booking_cancellation_option_id :bigint
#  booking_id                     :bigint
#  firm_id                        :bigint
#  payment_id                     :bigint
#  refund_id                      :bigint
#  stripe_refund_id               :string
#
# Indexes
#
#  index_refunds_on_account_id                      (account_id)
#  index_refunds_on_balance_id                      (balance_id)
#  index_refunds_on_booking_cancellation_option_id  (booking_cancellation_option_id)
#  index_refunds_on_booking_id                      (booking_id)
#  index_refunds_on_firm_id                         (firm_id)
#  index_refunds_on_payment_id                      (payment_id)
#  index_refunds_on_refund_id                       (refund_id)
#
require 'rails_helper'

RSpec.describe Refund, type: :model do
  describe 'model setup' do
    it 'constants' do
      expect(Refund::GRAPHQL_TYPE).to eq(Types::PaymentsRelated::RefundType)
    end
    it 'relations' do
      should have_many(:related_refunds).class_name('Refund')

      should belong_to(:booking_cancellation_option).optional
      should belong_to(:payment).optional
      should belong_to(:account).optional
      should belong_to(:parent_refund).optional.class_name('Refund').with_foreign_key('refund_id')
      should belong_to(:booking)
      should belong_to(:firm)
      should belong_to(:balance)
    end

    context 'validations' do
      it 'check' do
        should validate_presence_of(:status)
      end
    end

    it 'monetize' do
      expect(Refund.monetized_attributes).to eq({ 'refund_amount' => 'refund_amount_cents',
                                                  'penalty_amount' => 'penalty_amount_cents' })
    end
  end
end
