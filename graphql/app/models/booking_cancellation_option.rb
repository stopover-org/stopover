# frozen_string_literal: true

# == Schema Information
#
# Table name: booking_cancellation_options
#
#  id                  :bigint           not null, primary key
#  deadline            :integer          not null
#  description         :text             default("")
#  penalty_price_cents :decimal(, )
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
  GRAPHQL_TYPE = Types::EventsRelated::BookingCancellationOptionType

  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================
  monetize :penalty_price_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :refunds, dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================

  # AASM STATES ===========================================================
  aasm column: :status do
    state :active, initial: true
    state :inactive
    state :removed

    event :activate, before_save: :set_activated_at do
      transitions from: %i[inactive], to: :active
    end

    event :deactivate do
      transitions from: %i[active], to: :inactive
    end

    event :remove do
      transitions from: %i[active inactive], to: :removed
    end
  end

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[active inactive removed]).order(deadline: :desc) }

  # DELEGATION ============================================================
end
