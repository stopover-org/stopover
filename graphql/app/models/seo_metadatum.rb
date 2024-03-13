# frozen_string_literal: true

# == Schema Information
#
# Table name: seo_metadata
#
#  id          :bigint           not null, primary key
#  description :string           default("")
#  keywords    :string           default("")
#  language    :string           default("en")
#  title       :string           default("")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class SeoMetadatum < ApplicationRecord
  GRAPHQL_TYPE = Types::SeoRelated::SeoMetadatumType
  TRANSLATABLE_FIELDS = %i[title description keywords].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  has_one :event
  has_one :interest
  has_one :firm
  has_one :article

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  #
  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  #
  # AASM STATES ===========================================================
  #
  # ENUMS =================================================================
  enum language: {
    ru: 'ru',
    en: 'en'
  }, _prefix: true

  # SECURE TOKEN ==========================================================
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  #
  # CALLBACKS =============================================================
  #
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================
  #
end
