# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_connects
#
#  id                :bigint           not null, primary key
#  activated_at      :datetime
#  status            :string           default("pending"), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  firm_id           :bigint           not null
#  stripe_connect_id :string
#
# Indexes
#
#  index_stripe_connects_on_firm_id  (firm_id)
#
class StripeConnect < ApplicationRecord
  GRAPHQL_TYPE = Types::FirmsRelated::StripeConnectType

  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================

  # HAS_ONE ASSOCIATIONS ==========================================================

  # HAS_MANY ASSOCIATIONS =========================================================

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :firm

  # AASM STATES ================================================================
  aasm column: :status do
    state :pending, initial: true
    state :active
    state :inactive
    state :removed

    event :activate, before_save: :set_activated_at do
      before do
        self.activated_at = Time.zone.now
      end
      transitions from: %i[pending inactive], to: :active
    end

    event :deactivate do
      transitions from: %i[pending active], to: :inactive
    end

    event :remove do
      transitions from: %i[pending active inactive], to: :removed
    end
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  default_scope { order(created_at: :desc) }

  # DELEGATIONS ==============================================================
end
