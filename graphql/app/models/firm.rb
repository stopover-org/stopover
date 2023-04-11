# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id              :bigint           not null, primary key
#  city            :string
#  contact_person  :string
#  contacts        :text
#  country         :string
#  description     :text
#  full_address    :string
#  house_number    :string
#  latitude        :float
#  longitude       :float
#  primary_email   :string
#  primary_phone   :string
#  region          :string
#  status          :string           default("pending")
#  street          :string
#  stripe_account  :string           default("")
#  title           :string           not null
#  website         :string
#  setup_intent_id :bigint
#
# Indexes
#
#  index_firms_on_setup_intent_id  (setup_intent_id)
#
# Foreign Keys
#
#  fk_rails_...  (setup_intent_id => setup_intents.id)
#
class Firm < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  has_one :balance

  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :accounts

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
  validates :primary_email, presence: true, unless: :primary_phone
  validates :primary_phone, presence: true, unless: :primary_email
  validates :title, presence: true
  validates :accounts, length: { minimum: 1 }

  # CALLBACKS ================================================================
  after_create :create_balance

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def create_balance
    self.balance = Balance.new
  end

  def unpublish_events
    RemoveFirmJob.perform_later(id)
  end
end
