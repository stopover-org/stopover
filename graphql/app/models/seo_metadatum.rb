# frozen_string_literal: true

# == Schema Information
#
# Table name: seo_metadata
#
#  id          :bigint           not null, primary key
#  description :string           default("")
#  keywords    :string           default("")
#  title       :string           default("")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class SeoMetadatum < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event, optional: true
  belongs_to :interest, optional: true
  belongs_to :firm, optional: true

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
  #
  # CALLBACKS =============================================================
  #
  # SCOPES ================================================================
  #
  # DELEGATION ============================================================
  #
end
