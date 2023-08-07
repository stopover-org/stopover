# frozen_string_literal: true

# == Schema Information
#
# Table name: accounts
#
#  id                          :bigint           not null, primary key
#  city                        :string
#  country                     :string
#  date_of_birth               :datetime
#  full_address                :string
#  house_number                :string
#  last_name                   :string
#  latitude                    :float
#  longitude                   :float
#  name                        :string
#  phones                      :string           default([]), is an Array
#  postal_code                 :string
#  primary_notification_method :string
#  region                      :string
#  status                      :string           default("initial"), not null
#  street                      :string
#  verified_at                 :datetime
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  user_id                     :bigint
#
# Indexes
#
#  index_accounts_on_user_id  (user_id) UNIQUE
#
class Account < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :account_interests,  dependent: :destroy
  has_many :trips,              dependent: :destroy
  has_many :ratings
  has_many :account_firms

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :interests,  through: :account_interests
  has_many :bookings,   through: :trips
  has_many :firms, through: :account_firms

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :user, optional: false

  # AASM STATES ================================================================
  aasm column: :status do
    state :initial, initial: true
    state :verified
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validates :name, presence: true, if: :should_have_name?

  # CALLBACKS ================================================================
  before_validation :set_user_info

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

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

  def set_user_info
    return unless user

    phones.concat([user.phone]) if user.phone && phones.exclude?(user.phone)
  end
end
