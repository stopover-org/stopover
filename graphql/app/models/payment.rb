# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  fee_cents                  :decimal(, )      default(0.0)
#  payment_type               :string
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  balance_id                 :bigint
#  booking_id                 :bigint
#  firm_id                    :bigint
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_balance_id  (balance_id)
#  index_payments_on_booking_id  (booking_id)
#  index_payments_on_firm_id     (firm_id)
#
class Payment < ApplicationRecord
  # MODULES ===============================================================
  include Mixins::PaymentStatuses

  # MONETIZE =====================================================================
  monetize :total_price_cents
  monetize :fee_cents

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :payment_connections

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :stripe_integrations, through: :payment_connections

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :booking
  belongs_to :balance
  belongs_to :firm

  # AASM STATES ================================================================

  # ENUMS =======================================================================
  enum provider: {
    stripe: 'stripe'
  }

  enum payment_type: {
    full_amount: 'full_amount',
    deposit: 'deposit'
  }

  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  before_validation :calculate_fee, on: :create
  before_validation :set_price, on: :create
  before_validation :set_balance, on: :create

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  private

  def set_balance
    self.balance = firm.balance
  end

  def calculate_fee
    self.fee = booking.attendee_total_price - booking.organizer_total_price
  end

  def set_price
    self.total_price = booking.attendee_total_price
  end

  def top_up_balance
    balance.update!(total_amount: balance.total_amount + total_price)
  end
end
