# frozen_string_literal: true

# == Schema Information
#
# Table name: payouts
#
#  id                 :bigint           not null, primary key
#  completed_at       :datetime
#  status             :string
#  total_amount_cents :decimal(, )
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  balance_id         :bigint
#  firm_id            :bigint
#
# Indexes
#
#  index_payouts_on_balance_id  (balance_id)
#  index_payouts_on_firm_id     (firm_id)
#
class Payout < ApplicationRecord
  # MODULES ===============================================================
  include Mixins::PaymentStatuses

  # MONETIZE ==============================================================
  monetize :total_amount_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :firm
  belongs_to :balance

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================

  # HAS_MANY THROUGH ASSOCIATIONS =========================================

  # AASM STATES ===========================================================

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  before_validation :adjust_firm

  # CALLBACKS =============================================================

  # SCOPES ================================================================

  # DELEGATION ============================================================

  private

  def adjust_firm
    self.firm = payment.firm unless firm
    self.balance = firm.balance unless balance
  end
end
