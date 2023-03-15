# frozen_string_literal: true

# == Schema Information
#
# Table name: payment_connections
#
#  id                    :bigint           not null, primary key
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  payment_id            :bigint
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_payment_connections_on_payment_id             (payment_id)
#  index_payment_connections_on_stripe_integration_id  (stripe_integration_id)
#
class PaymentConnection < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE =====================================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :stripe_integration
  belongs_to :payment

  # AASM STATES ================================================================
  #
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
