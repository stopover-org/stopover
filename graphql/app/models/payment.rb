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
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  firm_id                    :bigint
#  payment_intent_id          :string
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_balance_id  (balance_id)
#  index_payments_on_booking_id  (booking_id)
#  index_payments_on_firm_id     (firm_id)
#
class Payment < ApplicationRecord
  GRAPHQL_TYPE = Types::PaymentsRelated::PaymentType

  # MODULES ===============================================================
  include Mixins::PaymentStatuses
  include Mixins::Indices::PaymentMappings
  include Mixins::Indices

  # MONETIZE ==============================================================
  monetize :total_price_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :booking
  belongs_to :firm
  belongs_to :balance

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :payment_connections, dependent: :destroy
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
  before_validation :adjust_price, on: :create
  before_validation :adjust_firm

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[pending processing successful canceled]).order(created_at: :desc) }

  # DELEGATION ============================================================

  def balance_amount
    total_price - refunds_amount
  end

  def refunds_amount
    refunds.where(status: %i[processing successful])
           .where.not(refund_id: nil)
           .map(&:refund_amount).sum(Money.new(0))
  end

  def top_up_balance
    balance.update!(total_amount: balance.total_amount + total_price) if successful?
  end

  private

  def adjust_firm
    self.firm = booking&.firm unless firm
    self.balance = booking&.firm&.balance unless balance
  end

  def adjust_price
    self.total_price = booking&.attendee_total_price if total_price.zero?
  end
end
