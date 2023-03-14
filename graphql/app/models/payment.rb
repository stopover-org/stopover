# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                :bigint           not null, primary key
#  status            :string
#  total_price_cents :decimal(, )      default(0.0)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
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
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :stripe_integrations

  # BELONGS_TO ASSOCIATIONS =======================================================
  # belongs_to :stripe_integration

  # AASM STATES ================================================================
  aasm column: :status do
    state :pending, initial: true
    state :processing
    state :canceled
    state :successful

    event :process do
      transitions from: %i[pending canceled], to: :processing
    end
    event :cancel do
      transitions from: :processing, to: :canceled
    end
    event :success do
      transitions from: :processing, to: :successful
    end
  end
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================
end
