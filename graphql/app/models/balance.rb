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
  GRAPHQL_TYPE = Types::FirmsRelated::BalanceType

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
  has_many :refunds,  dependent: :nullify

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

  def successful_payments
    payments.successful.map(&:balance_amount).sum(Money.new(0))
  end

  def pending_payments
    payments.pending.map(&:balance_amount).sum(Money.new(0))
  end

  def processing_payments
    payments.processing.map(&:balance_amount).sum(Money.new(0))
  end

  def withdrawn_amount
    payouts.where(status: %w[processing successful])
           .map(&:total_amount)
           .sum(Money.new(0))
  end

  def withdrawable_amount
    successful_payments - withdrawn_amount
  end

  def payout!(amount)
    ::Stopover::BalanceManagement::PayoutCreator.new(self, amount).perform
  end
end
