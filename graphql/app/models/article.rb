# frozen_string_literal: true

# == Schema Information
#
# Table name: articles
#
#  id               :bigint           not null, primary key
#  content          :text
#  language         :string           default("en")
#  published_at     :datetime
#  title            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  seo_metadatum_id :bigint
#
# Indexes
#
#  index_articles_on_seo_metadatum_id  (seo_metadatum_id)
#
class Article < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :seo_metadatum, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :article_interests, dependent: :destroy

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :interests, through: :article_interests

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
  has_one_attached :images

  # RICH_TEXT =============================================================
  #
  # VALIDATIONS ===========================================================
  validates :title, :content, :language, presence: true

  # CALLBACKS =============================================================
  after_commit :adjust_seo_metadata

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  def adjust_seo_metadata
    unless seo_metadatum
      update!(seo_metadatum: SeoMetadatum.create!(article: self,
                                                  language: language,
                                                  title: title,
                                                  description: title,
                                                  keywords: ''))
    end
  end
end
