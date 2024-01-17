# frozen_string_literal: true

# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  language   :string           default("en")
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tags_on_title  (title) UNIQUE
#
class Tag < ApplicationRecord
  GRAPHQL_TYPE = Types::TagType
  TRANSLATABLE_FIELDS = [:title].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable
  include Mixins::Indices

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  #
  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :event_tags, dependent: :destroy
  has_many :dynamic_translations, as: :translatable, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :events, through: :event_tags

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
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :language, presence: true

  # CALLBACKS =============================================================
  #
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================
end
