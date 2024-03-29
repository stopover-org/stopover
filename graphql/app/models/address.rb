# frozen_string_literal: true

# == Schema Information
#
# Table name: addresses
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  full_address :text
#  house_number :string
#  latitude     :float
#  longitude    :float
#  postal_code  :string
#  region       :string
#  street       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  firm_id      :bigint
#
# Indexes
#
#  index_addresses_on_firm_id  (firm_id)
#
class Address < ApplicationRecord
  DEFAULT_COUNTRY = ISO3166::Country.find_country_by_any_name('Serbia').iso_short_name
  GRAPHQL_TYPE = Types::FirmsRelated::AddressType

  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :firm, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :events
  has_many :accounts

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  #
  # ENUMS =================================================================
  #
  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :country,
            inclusion: { in: ISO3166::Country.all.map(&:iso_short_name) }
  validates :country, presence: true
  #
  # CALLBACKS =============================================================
  before_validation :adjust_country
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  private

  def adjust_country
    self.country = DEFAULT_COUNTRY unless country
  end
end
