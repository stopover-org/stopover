# frozen_string_literal: true

# == Schema Information
#
# Table name: stripe_integrations
#
#  id              :bigint           not null, primary key
#  status          :string
#  stripeable_type :string
#  version         :integer          default(1)
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
  GRAPHQL_TYPE = Types::EventsRelated::StripeIntegrationType

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
  aasm column: :status do
    state :active, initial: true
    state :removed

    event :remove do
      transitions from: :active, to: :removed
    end
    event :activate do
      transitions from: :removed, to: :active
    end
  end
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validates :version, :status,
            :price_id, :product_id,
            presence: true, uniqueness: { scope: [:id] }
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  default_scope { in_order_of(:status, %w[active removed]).order(version: :desc) }

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
