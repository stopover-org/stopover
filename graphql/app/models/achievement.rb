# frozen_string_literal: true

# == Schema Information
#
# Table name: achievements
#
#  id         :bigint           not null, primary key
#  active     :boolean          default(TRUE)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_achievements_on_title  (title) UNIQUE
#
class Achievement < ApplicationRecord
  # MODULES ===============================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :event_achievements, dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :events, through: :event_achievements

  # BELONGS_TO ASSOCIATIONS =======================================================
  #
  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================
end
