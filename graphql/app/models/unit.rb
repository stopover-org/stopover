# frozen_string_literal: true

# == Schema Information
#
# Table name: units
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  unit_type  :string           default(NULL), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Unit < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::UnitType
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  #
  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :events

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  #
  # ENUMS =================================================================
  enum unit_type: { common: :common, technique: :technique }

  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================

  # CALLBACKS =============================================================
  #
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================
end
