# == Schema Information
#
# Table name: penalties
#
#  id                             :bigint           not null, primary key
#  amount_cents                   :bigint           not null
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  balance_id                     :bigint
#  booking_cancellation_option_id :bigint
#  booking_id                     :bigint
#  refund_id                      :bigint
#
# Indexes
#
#  index_penalties_on_balance_id                      (balance_id)
#  index_penalties_on_booking_cancellation_option_id  (booking_cancellation_option_id)
#  index_penalties_on_booking_id                      (booking_id)
#  index_penalties_on_refund_id                       (refund_id)
#
class Penalty < ApplicationRecord
  # MODULES =======================================================================

  # MONETIZE ======================================================================
  monetize :amount_cents

  # SECURE PASSWORD ===============================================================

  # ATTACHMENTS ===================================================================

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :balance
  belongs_to :booking
  belongs_to :booking_cancellation_option
  belongs_to :refund

  # HAS_ONE ASSOCIATIONS ==========================================================

  # HAS_MANY ASSOCIATIONS =========================================================

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================

  # HAS_ONE :THROUGH ASSOCIATIONS =================================================

  # RICH TEXT =====================================================================

  # SECURE TOKENS =================================================================

  # AASM STATES ===================================================================

  # ENUMS =========================================================================

  # VALIDATIONS ===================================================================

  # CALLBACKS =====================================================================

  # SCOPES ========================================================================

  # DELEGATIONS ===================================================================
end
