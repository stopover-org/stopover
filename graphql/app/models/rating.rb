# frozen_string_literal: true

# == Schema Information
#
# Table name: ratings
#
#  id           :bigint           not null, primary key
#  rating_value :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#  event_id     :bigint
#  review_id    :bigint
#
# Indexes
#
#  index_ratings_on_account_id  (account_id)
#  index_ratings_on_event_id    (event_id)
#  index_ratings_on_review_id   (review_id)
#
class Rating < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event
  belongs_to :account, optional: true
  belongs_to :review

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
  validates :rating_value, presence: true
  validates :rating_value, numericality: { in: 1..5 }

  # CALLBACKS =============================================================
  before_validation :adjust_event
  before_validation :adjust_account
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  def adjust_event
    self.event = review&.event unless event
  end

  def adjust_account
    self.account = review&.account unless account
  end
end
