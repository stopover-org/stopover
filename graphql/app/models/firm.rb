# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id             :bigint           not null, primary key
#  city           :string
#  contact_person :string
#  contacts       :text
#  country        :string
#  description    :text
#  full_address   :string
#  house_number   :string
#  latitude       :float
#  longitude      :float
#  primary_email  :string           not null
#  primary_phone  :string
#  region         :string
#  status         :string           default("pending")
#  street         :string
#  title          :string           not null
#  website        :string
#
class Firm < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  has_many :events, dependent: :destroy

  # AASM STATES ================================================================
  aasm column: :status do
    state :pending, initial: true
    state :active
    state :deleted

    event :activate do
      transitions from: %i[pending deleted], to: :active
    end
    event :soft_delete, after_commit: :unpublish_events do
      transitions from: %i[active pending], to: :deleted
    end
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validates :primary_email, :title, presence: true

  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def unpublish_events
    RemoveFirmJob.perform_later(id)
  end
end
