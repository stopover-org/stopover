# frozen_string_literal: true

# == Schema Information
#
# Table name: payments
#
#  id                    :bigint           not null, primary key
#  cancel_url            :string
#  success_url           :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  checkout_id           :string
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_payments_on_stripe_integration_id  (stripe_integration_id)
#
class Payment < ApplicationRecord
  # MODULES ===============================================================

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :stripe_integration
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
