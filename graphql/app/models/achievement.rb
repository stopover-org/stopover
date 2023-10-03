# frozen_string_literal: true

# == Schema Information
#
# Table name: achievements
#
#  id         :bigint           not null, primary key
#  active     :boolean          default(TRUE)
#  language   :string           default("en")
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_achievements_on_title  (title) UNIQUE
#
class Achievement < ApplicationRecord
  GRAPHQL_TYPE = Types::FirmsRelated::AchievementType
  TRANSLATABLE_FIELDS = [:title].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :event_achievements,   dependent: :destroy
  has_many :dynamic_translations, as: :translatable, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :events, through: :event_achievements

  # AASM STATES ===========================================================

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validates :title, :language, presence: true

  # CALLBACKS =============================================================

  # SCOPES ================================================================

  # DELEGATION ============================================================
end
