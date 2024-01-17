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
  #
  # CALLBACKS =============================================================
  #
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================
end
