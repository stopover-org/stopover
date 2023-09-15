# frozen_string_literal: true

# == Schema Information
#
# Table name: balances
#
#  id                 :bigint           not null, primary key
#  total_amount_cents :decimal(, )      default(0.0)
#  withdrawn_at       :datetime
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
  has_many :payments

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

  def successful
    payments.successful.map(&:total_price).sum(Money.new(0))
  end

  def pending
    payments.pending.map(&:total_price).sum(Money.new(0))
  end

  def processing
    payments.processing.map(&:total_price).sum(Money.new(0))
  end

  def withdrawn
    payments.successful.where.not('withdrawn_cents = total_price')
            .map(&:withdrawn_aount).sum(Money.new(0))
  end

  def withdrawable
    payments.successful.where('withdrawn_cents = total_price')
            .map(&:total_amount).sum(Money.new(0))
  end

  def withdraw(amount)
    return if amount > total_amount

    left_to_withdraw = amount
    withdrawable.each do |payment|
      if payment.available_amount < left_to_withdraw
        left_to_withdraw -= payment.available_amount
        payment.update!(withdrawn_at: Time.current, withdrawn: payment.available_amount)
      else
        left_to_withdraw = Money.new(0)
        new_payments.first.update!(withdrawn_at: Time.current, withdrawn: left_to_withdraw)
      end
    end

    self.withdrawn_at = Time.current
    self.total_amount = total_amount - amount
    save!
  end
end
