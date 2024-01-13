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
#  language      :string           default("en"), not null
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
#  firm_id       :bigint
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_firm_id  (firm_id)
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
  belongs_to :firm, optional: true

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
  enum language: {
    ru: 'ru',
    en: 'en'
  }

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validates :language, presence: true

  # CALLBACKS =============================================================
  before_validation :adjust_user_info, unless: :temporary_user?

  # SCOPES ================================================================
  default_scope { in_order_of(:status, %w[verified initial]) }

  # DELEGATION ============================================================

  def current_trip
    trips.last
  end

  def current_firm
    firm
  end

  private

  def temporary_user?
    user&.temporary?
  end

  def adjust_user_info
    self.primary_phone = user.phone if user&.phone
    self.primary_email = user.email if user&.email
    phones.concat([user.phone]) if user&.phone && phones&.exclude?(user&.phone)
    phones.concat([primary_phone]) if primary_phone && phones&.exclude?(primary_phone)
  end
end
