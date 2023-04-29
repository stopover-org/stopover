# frozen_string_literal: true

# == Schema Information
#
# Table name: trips
#
#  id           :bigint           not null, primary key
#  city         :string
#  country      :string
#  end_date     :date
#  full_address :string
#  latitude     :float
#  longitude    :float
#  region       :string
#  start_date   :date
#  status       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#
# Indexes
#
#  index_trips_on_account_id  (account_id)
#
class Trip < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :bookings, dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :account

  # AASM STATES ================================================================
  aasm :status do
    state :draft, initial: true
    state :active
  end
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  #
  # CALLBACKS ================================================================
  #
  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def start_date
    bookings.includes(:schedule).order('schedules.scheduled_for ASC').last.schedule.scheduled_for
  end

  def end_date
    bookings.includes(:schedule).order('schedules.scheduled_for DESC').last.schedule.scheduled_for
  end

  def cities
    bookings.map do |booking|
      booking.event.city
    end
  end
end
