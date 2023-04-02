# frozen_string_literal: true

# == Schema Information
#
# Table name: balances
#
#  id                 :bigint           not null, primary key
#  total_amount_cents :decimal(, )      default(0.0)
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  firm_id            :bigint
#
# Indexes
#
#  index_balances_on_firm_id  (firm_id)
#
require 'date'

class Balance < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE =====================================================================
  monetize :total_amount_cents

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :payments

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :firm

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
  #
end
