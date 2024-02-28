# frozen_string_literal: true

# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  attendees_count :integer
#  author          :string
#  description     :text
#  language        :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint
#  event_id        :bigint
#  firm_id         :bigint
#
# Indexes
#
#  index_reviews_on_account_id  (account_id)
#  index_reviews_on_event_id    (event_id)
#  index_reviews_on_firm_id     (firm_id)
#
class Review < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event
  belongs_to :firm
  belongs_to :account, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  has_one :rating

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
  validates :title, :language,
            :author, presence: true

  # CALLBACKS =============================================================
  before_validation :adjust_firm
  before_validation :adjust_author

  # SCOPES ================================================================
  #
  # DELEGATION ============================================================

  def adjust_firm
    self.firm = event&.firm unless firm
  end

  def adjust_author
    self.author = account&.name unless author
  end
end
