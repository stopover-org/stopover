# frozen_string_literal: true

# == Schema Information
#
# Table name: interests
#
#  id         :bigint           not null, primary key
#  active     :boolean          default(TRUE)
#  language   :string           default("en")
#  slug       :string           not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_interests_on_slug   (slug) UNIQUE
#  index_interests_on_title  (title) UNIQUE
#
class Interest < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::InterestType
  TRANSLATABLE_FIELDS = [:title].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable
  searchkick callbacks: Rails.env.test? ? false : :async

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :account_interests,  dependent: :destroy
  has_many :event_interests,    dependent: :destroy
  has_many :dynamic_translations, as: :translatable, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :accounts, through: :account_interests
  has_many :events,   through: :event_interests

  # AASM STATES ===========================================================

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================
  has_one_attached :preview

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validates :title, :language, :active, presence: true
  validates :slug, uniqueness: { case_sensitive: false }

  # CALLBACKS =============================================================
  before_validation :set_slug

  # SCOPES ================================================================

  # DELEGATION ============================================================

  def search_data
    {
      title: title
    }
  end

  def should_index?
    active
  end

  def set_slug
    return if slug
    parameterized_title = title&.parameterize || SecureRandom.uuid
    self.slug = parameterized_title if Interest.where(slug: parameterized_title).empty?
    self.slug = SecureRandom.hex unless slug
  end
end
