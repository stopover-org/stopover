# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                         :bigint           not null, primary key
#  provider                   :string
#  status                     :string
#  total_price_cents          :decimal(, )      default(0.0)
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  booking_id                 :bigint
#  stripe_checkout_session_id :string
#
# Indexes
#
#  index_payments_on_booking_id  (booking_id)
#
class Payment < ApplicationRecord
  include AASM
  # MODULES ===============================================================
  #
  # MONETIZE =====================================================================
  monetize :total_price_cents

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

  # AASM STATES ================================================================
  aasm column: :status do
    state :pending, initial: true
    state :processing
    state :canceled
    state :successful

    event :process do
      transitions from: %i[successful pending canceled], to: :processing
    end
    event :cancel do
      transitions from: :processing, to: :canceled
    end
    event :success do
      transitions from: :processing, to: :successful
    end
  end
  # ENUMS =======================================================================
  enum provider: {
    stripe: 'stripe'
  }
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================
end
