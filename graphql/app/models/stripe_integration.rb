# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
#  name            :string
#  stripeable_type :string
#  unit_amount     :decimal(, )
#  created_at      :datetime         not null
#  updated_at      :datet         not null
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
  belongs_to :stripeable, polymorphic: true

  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  after_commit :sync_stripe

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

  private

  def sync_stripe
    StripeIntegrator.sync(self)
  end
end
