# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id            :bigint           not null, primary key
#  date_of_birth :datetime
#  language      :string           default("en"), not null
#  name          :string
#  phones        :string           default([]), is an Array
#  primary_email :string
#  primary_phone :string
#  status        :string           default("initial"), not null
#  verified_at   :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  address_id    :bigint
#  firm_id       :bigint
#  user_id       :bigint
#
# Indexes
#
#  index_accounts_on_address_id  (address_id)
#  index_accounts_on_firm_id     (firm_id)
#  index_accounts_on_user_id     (user_id) UNIQUE
#
class Account < ApplicationRecord
  GRAPHQL_TYPE = Types::UsersRelated::AccountType

  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================
  #
  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :user, optional: false
  belongs_to :firm, optional: true
  belongs_to :address, optional: true

  # HAS_ONE ASSOCIATIONS ==================================================
  #
  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  #
  # HAS_MANY ASSOCIATIONS =================================================
  has_many :account_interests, dependent: :destroy
  has_many :trips, dependent: :destroy
  has_many :account_firms, dependent: :destroy
  has_many :ratings, dependent: :nullify
  has_many :refunds, dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :interests, through: :account_interests
  has_many :bookings, through: :trips
  has_many :firms, through: :account_firms

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
  #
  # SECURE PASSWORD =======================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # RICH_TEXT =============================================================
  #
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
