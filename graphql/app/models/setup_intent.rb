# frozen_string_literal: true

class SetupIntent < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  #
  # AASM STATES ================================================================
  aasm column: :status do
    state :pending, initial: true
    state :processing
    state :successful
    state :failed

    event :success do
      transitions from: :processing, to: :successful
    end
    event :failed do
      transitions from: :processing, to: :failed
    end
    event :process do
      transitions from: %i[pending successful failed], to: :processing
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
