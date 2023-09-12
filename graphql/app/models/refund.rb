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
#  booking_cancellation_option_id :bigint
#  booking_id                     :bigint
#  firm_id                        :bigint
#  payment_id                     :bigint
#
# Indexes
#
#  index_refunds_on_account_id                      (account_id)
#  index_refunds_on_booking_cancellation_option_id  (booking_cancellation_option_id)
#  index_refunds_on_booking_id                      (booking_id)
#  index_refunds_on_firm_id                         (firm_id)
#  index_refunds_on_payment_id                      (payment_id)
#
class Refund < ApplicationRecord
  # MODULES ===============================================================
  include Mixins::PaymentStatuses

  # MONETIZE ==============================================================
  monetize :refund_amount_cents
  monetize :penalty_amount_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking_cancellation_option, optional: true
  belongs_to :payment, optional: true
  belongs_to :booking
  belongs_to :account
  belongs_to :firm

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

  # CALLBACKS =============================================================

  # SCOPES ================================================================

  # DELEGATION ============================================================
end
