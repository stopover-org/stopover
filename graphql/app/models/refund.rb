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
class Refund < ApplicationRecord
  GRAPHQL_TYPE = Types::PaymentsRelated::RefundType

  # MODULES ===============================================================
  include Mixins::PaymentStatuses
  include Mixins::Indices

  # MONETIZE ==============================================================
  monetize :refund_amount_cents
  monetize :penalty_amount_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking_cancellation_option, optional: true
  belongs_to :payment, optional: true
  belongs_to :booking
  belongs_to :account, optional: true
  belongs_to :firm
  belongs_to :balance
  belongs_to :parent_refund, class_name: 'Refund', optional: true, foreign_key: 'refund_id', inverse_of: :related_refunds

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :related_refunds, class_name: 'Refund'

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  #
  # ENUMS =================================================================
  #
  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :refund_amount_cents, presence: true
  validates :penalty_amount_cents, presence: true
  validates :status, presence: true

  # CALLBACKS =============================================================
  before_validation :adjust_references

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[pending processing successful canceled]).order(created_at: :desc) }

  # DELEGATION ============================================================
  def total_amount
    refund_amount + penalty_amount
  end

  def top_up_balance
    firm.balance.update!(total_amount: firm.balance.total_amount - refund_amount) if parent_refund
  end

  def search_data
    {
      penalty_amount_cents: penalty_amount_cents,
      refund_amount_cents: refund_amount_cents,
      status: status,
      booking_cancellation_option_id: booking_cancellation_option_id,
      booking_id: booking_id,
      firm_id: firm_id,
      payment_id: payment_id,
      refund_id: refund_id,
      stripe_refund_id: stripe_refund_id
    }
  end

  private

  def adjust_references
    self.firm = booking&.firm unless firm
    self.balance = firm&.balance unless balance
  end
end
