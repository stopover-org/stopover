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
require 'date'

class Balance < ApplicationRecord
  # MODULES ===============================================================

  # MONETIZE ==============================================================
  monetize :total_amount_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :firm

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :payments, dependent: :nullify
  has_many :payouts,  dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================

  # AASM STATES ===========================================================

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================

  # SCOPES ================================================================

  # DELEGATION ============================================================

  def successful_amount
    payments.successful.map(&:total_price).sum(Money.new(0))
  end

  def pending_amount
    payments.pending.map(&:balance_amount).sum(Money.new(0))
  end

  def processing_amount
    payments.processing.map(&:balance_amount).sum(Money.new(0))
  end

  def withdrawn_amount
    payments.successful
            .map(&:payouts_amount)
            .sum(Money.new(0))
  end

  def withdrawable_amount
    payments.successful
            .map(&:balance_amount)
            .sum(Money.new(0))
  end

  def payout!(amount)
    return if amount > withdrawable_amount

    left_to_withdraw = amount
    payments.withdrawable.find_each do |payment|
      if payment.balance_amount < left_to_withdraw
        payment.payouts.create!(firm: payment.firm, balance: self, total_amount: payment.balance_amount)
        left_to_withdraw -= payment.total_price
      else
        left_to_withdraw = Money.new(0)
        payment.payouts.create!(firm: payment.firm, balance: self, total_amount: left_to_withdraw)
        left_to_withdraw -= payment.total_price
      end
    end

    self.last_payout_at = Time.current
    self.total_amount = total_amount - amount
    save!
  end
end
