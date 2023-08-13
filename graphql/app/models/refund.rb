# frozen_string_literal: true

# == Schema Information
#
# Table name: refunds
#
#  id           :bigint           not null, primary key
#  amount_cents :bigint           not null
#  author_type  :string           not null
#  status       :string           default("pending"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#  balance_id   :bigint
#  booking_id   :bigint
#
# Indexes
#
#  index_refunds_on_account_id  (account_id)
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
  has_one :firm, through: :balance

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

  # CALLBACKS =====================================================================
  after_create_commit :notify_manager

  # SCOPES ========================================================================

  # DELEGATIONS ===================================================================

  def top_up_balance
    balance.update!(total_amount: balance.total_amount + amount)
  end

  private

  def update_booking
    booking.cancel! if successful?
  end

  def notify_manager
    Notification.create(
      origin_key: Notification::ORIGIN_KEYS[:firm_refund_created],
      to: firm.delivery_to,
      subject: 'Refund was created',
      content: Stopover::MailProvider.prepare_content(file: "mailer/#{Notification::ORIGIN_KEYS[:firm_refund_created]}",
                                                      locals: { refund: self }),
      delivery_method: firm.delivery_method
    )
  end
end
