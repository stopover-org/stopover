# == Schema Information
#
# Table name: refunds
#
#  id           :bigint           not null, primary key
#  amount_cents :bigint           not null
#  author       :string           not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  balance_id   :bigint
#  booking_id   :bigint
#
# Indexes
#
#  index_refunds_on_balance_id  (balance_id)
#  index_refunds_on_booking_id  (booking_id)
#
class Refund < ApplicationRecord
  # MODULES =======================================================================
  include Mixins::PaymentStatuses

  # MONETIZE ======================================================================
  monetize :amount_cents

  # SECURE PASSWORD ===============================================================

  # ATTACHMENTS ===================================================================

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :balance
  belongs_to :booking
  belongs_to :account

  # HAS_ONE ASSOCIATIONS ==========================================================
  has_one :penalty

  # HAS_MANY ASSOCIATIONS =========================================================

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================

  # HAS_ONE :THROUGH ASSOCIATIONS =================================================

  # RICH TEXT =====================================================================

  # SECURE TOKENS =================================================================

  # AASM STATES ===================================================================

  # ENUMS =========================================================================
  enum author: {
    manager: 'manager',
    attendee: 'attendee'
  }

  # VALIDATIONS ===================================================================
  validates :author, presence: true

  # CALLBACKS =====================================================================

  # SCOPES ========================================================================

  # DELEGATIONS ===================================================================

  def top_up_balance
    balance.update!(total_amount: balance.total_amount + amount)
  end
end
