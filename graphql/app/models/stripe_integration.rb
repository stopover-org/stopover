# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
#  price_type      :string
#  status          :string
#  stripeable_type :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  price_id        :string
#  product_id      :string
#  stripeable_id   :bigint
#
# Indexes
#
#  index_stripe_integrations_on_stripeable_id_and_stripeable_type  (stripeable_id,stripeable_type)
#
class StripeIntegration < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :payment_connections

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :payments, through: :payment_connections

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :stripeable, polymorphic: true

  # AASM STATES ================================================================
  enum price_type: {
    full_amount: 'full_amount'
  }

  aasm column: :status do
    state :active, initial: true
    state :deleted

    event :soft_delete do
      transitions from: :active, to: :deleted
    end
    event :activate do
      transitions from: :deleted, to: :active
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

  def name
    stripeable&.title
  end

  def unit_amount
    case stripeable&.class&.name
    when 'Event'
      return stripeable&.attendee_price_per_uom
    when 'EventOption'
      return stripeable&.attendee_price
    end

    0
  end
end
