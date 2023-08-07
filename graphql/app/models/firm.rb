# frozen_string_literal: true

# == Schema Information
#
# Table name: firms
#
#  id                :bigint           not null, primary key
#  business_type     :string           default("individual"), not null
#  city              :string
#  contact_person    :string
#  contacts          :text
#  country           :string
#  description       :text
#  full_address      :string
#  house_number      :string
#  latitude          :float
#  longitude         :float
#  margin            :integer          default(0)
#  payment_types     :string           default([]), not null, is an Array
#  postal_code       :string
#  primary_email     :string
#  primary_phone     :string
#  ref_number        :string
#  region            :string
#  status            :string           default("pending")
#  street            :string
#  title             :string           not null
#  website           :string
#  stripe_account_id :string
#
# Indexes
#
#  index_firms_on_ref_number  (ref_number) UNIQUE
#
class Firm < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  has_one_attached :image

  # HAS_ONE ASSOCIATIONS ==========================================================
  has_one :balance

  # HAS_MANY ASSOCIATIONS =========================================================
  # has_many :accounts
  has_many :account_firms
  has_many :events, dependent: :destroy
  has_many :stripe_connects

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :accounts, through: :account_firms
  has_many :bookings, through: :events
  has_many :schedules, through: :events
  has_many :payments, through: :balance

  # BELONGS_TO ASSOCIATIONS =======================================================

  # AASM STATES ================================================================
  aasm column: :status do
    state :pending, initial: true
    state :active
    state :removed

    event :activate do
      transitions from: %i[pending removed], to: :active
    end
    event :remove, after_commit: :remove_callback do
      transitions from: %i[active pending], to: :removed
    end
  end

  # ENUMS =======================================================================
  enum business_type: {
    individual: 'individual',
    company: 'company',
    non_profit: 'non_profit',
    # US only
    government_entity: 'government_entity'
  }

  # VALIDATIONS ================================================================
  validates :primary_email,
            presence: true,
            unless: :primary_phone
  validates :primary_phone,
            presence: true,
            unless: :primary_email
  validates :title,
            presence: true
  validates :account_firms,
            length: { minimum: 1 }
  validates :ref_number,
            uniqueness: true,
            allow_blank: true

  # CALLBACKS ================================================================
  after_create :create_balance

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def delivery_method
    'email'
  end

  def delivery_to
    primary_email
  end

  private

  def create_balance
    self.balance = Balance.new
  end

  def remove_callback
    RemoveFirmJob.perform_later(id)
  end
end
