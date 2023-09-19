# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  city          :string
#  country       :string
#  date_of_birth :datetime
#  full_address  :string
#  house_number  :string
#  last_name     :string
#  latitude      :float
#  longitude     :float
#  name          :string
#  phones        :string           default([]), is an Array
#  postal_code   :string
#  primary_email :string
#  primary_phone :string
#  region        :string
#  status        :string           default("initial"), not null
#  street        :string
#  verified_at   :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_user_id  (user_id) UNIQUE
#
class Account < ApplicationRecord
  GRAPHQL_TYPE = Types::UsersRelated::AccountType

  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :user, optional: false

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :account_interests,  dependent: :destroy
  has_many :trips,              dependent: :destroy
  has_many :account_firms,      dependent: :destroy
  has_many :ratings,            dependent: :nullify
  has_many :refunds,            dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :interests,  through: :account_interests
  has_many :bookings,   through: :trips
  has_many :firms,      through: :account_firms

  # AASM STATES ===========================================================
  aasm column: :status do
    state :initial, initial: true
    state :verified
  end

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validates :name, presence: true, if: :should_have_name?

  # CALLBACKS =============================================================
  before_validation :adjust_user_info

  # SCOPES ================================================================

  # DELEGATION ============================================================

  def current_trip
    trips.last
  end

  def current_firm
    firms.where(status: %i[active pending]).last
  end

  private

  def should_have_name?
    !user&.temporary?
  end

  def adjust_user_info
    self.primary_phone = user.phone if user&.phone
    self.primary_email = user.email if user&.email
    phones.concat([user.phone]) if user&.phone && phones&.exclude?(user&.phone)
    phones.concat([primary_phone]) if primary_phone && phones&.exclude?(primary_phone)
  end
end
