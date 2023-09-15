# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  payment_type               :string
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  withdrawn_at               :datetime
#  withdrawn_cents            :bigint           default(0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  payment_intent_id          :string
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_balance_id  (balance_id)
#  index_payments_on_booking_id  (booking_id)
#
class Payment < ApplicationRecord
  # MODULES ===============================================================
  include Mixins::PaymentStatuses

  # MONETIZE ==============================================================
  monetize :total_price_cents
  monetize :withdrawn_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking
  belongs_to :balance

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :payment_connections
  has_many :refunds, dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :stripe_integrations, through: :payment_connections

  # AASM STATES ===========================================================

  # ENUMS =================================================================
  enum provider: {
    stripe: 'stripe'
  }
  enum payment_type: {
    full_amount: 'full_amount',
    deposit: 'deposit'
  }

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================
  before_validation :set_price, on: :create

  # SCOPES ================================================================
  scope :withdrawn, -> { successful.where('withdrawn_cents = total_price') }
  scope :withdrawable, -> { successful.where.not('withdrawn_cents = total_price') }

  # DELEGATION ============================================================

  def available_amount
    total_price - withdrawn
  end

  def refundable_amount
    total_price - refunds.successful.map(&:refund_amount).sum(Money.new(0))
  end

  def top_up_balance
    balance.update!(total_amount: balance.total_amount + Money.new(total_price))
  end

  private

  def set_price
    self.total_price = booking.attendee_total_price unless total_price
  end
end
