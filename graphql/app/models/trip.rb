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
    state :cancelled

    event :cancel do
      after_commit do
        cancel_trip
      end

      transitions from: %i[active draft], to: :cancelled, guard: :can_cancel
    end
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

  def can_cancel
    return false if cancelled?
    return false if bookings.paid.any?
    return false if end_date.past?
    true
  end

  def start_date
    bookings.includes(:schedule).order('schedules.scheduled_for DESC').last.schedule.scheduled_for
  end

  def end_date
    bookings.includes(:schedule).order('schedules.scheduled_for ASC').last.schedule.scheduled_for
  end

  def cities
    bookings.map do |booking|
      booking.event.city
    end
  end

  def cancel_trip
    bookings.each do |booking|
      booking.cancel!
    end
  end
end
