# frozen_string_literal: true

# == Schema Information
#
# Table name: booking_cancellation_options
#
#  id                  :bigint           not null, primary key
#  deadline            :datetime
#  description         :text             default("")
#  penalty_price_cents :integer
#  status              :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  event_id            :bigint
#
# Indexes
#
#  index_booking_cancellation_options_on_event_id  (event_id)
#
class BookingCancellationOption < ApplicationRecord
  # MODULES ===============================================================
  enum status: { active: 0, disabled: 1 }

  # MONETIZE =====================================================================
  monetize :penalty_price_cents

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event

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
