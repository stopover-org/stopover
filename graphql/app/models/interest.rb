# frozen_string_literal: true

# == Schema Information
#
# Table name: interests
#
#  id               :bigint           not null, primary key
#  description      :text             default("")
#  language         :string           default("en")
#  slug             :string           not null
#  title            :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  seo_metadatum_id :bigint
#
# Indexes
#
#  index_interests_on_seo_metadatum_id  (seo_metadatum_id)
#  index_interests_on_slug              (slug) UNIQUE
#  index_interests_on_title             (title) UNIQUE
#
class Interest < ApplicationRecord
  GRAPHQL_TYPE = Types::EventsRelated::InterestType
  TRANSLATABLE_FIELDS = %i[title description].freeze
  AVAILABLE_LANGUAGES = %i[en ru].freeze

  # MODULES ===============================================================
  include Mixins::Translatable
  include Mixins::Indices::InterestMappings
  include Mixins::Indices

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :seo_metadatum, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :account_interests, dependent: :destroy
  has_many :event_interests, dependent: :destroy
  has_many :article_interests, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :accounts, through: :account_interests
  has_many :events, through: :event_interests
  has_many :articles, through: :article_interests

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
  has_one_attached :preview

  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :title, :language, presence: true
  validates :slug, uniqueness: { case_sensitive: false }
  validates :title, uniqueness: { case_sensitive: false }
  validates :description, presence: true

  # CALLBACKS =============================================================
  before_validation :set_slug
  after_commit :adjust_seo_metadata

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  def set_slug
    return if slug
    parameterized_title = title&.parameterize || SecureRandom.uuid
    self.slug = parameterized_title if Interest.where(slug: parameterized_title).empty?
    self.slug = SecureRandom.hex unless slug
  end

  def adjust_seo_metadata
    unless seo_metadatum
      update!(seo_metadatum: SeoMetadatum.create!(interest: self,
                                                  language: language,
                                                  title: title,
                                                  description: description,
                                                  keywords: [slug, title].join(' ')))
    end
  end
end
