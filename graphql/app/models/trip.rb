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

# TODO: remove start_date end_date from the table
class Trip < ApplicationRecord
  GRAPHQL_TYPE = Types::TripsRelated::TripType

  # MODULES ===============================================================
  include AASM

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :bookings,
           -> { includes(:schedule).order('schedules.scheduled_for ASC') },
           dependent: :destroy,
           inverse_of: :trip

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

    event :activate do
      transitions from: :draft, to: :active
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

  def firm
    account.current_firm
  end

  def can_cancel
    return false if cancelled?
    return false if bookings.paid.any?
    return false if end_date.past?
    true
  end

  def start_date
    bookings.first.schedule.scheduled_for
  end

  def end_date
    bookings.last.schedule.scheduled_for
  end

  def cities
    bookings.map do |booking|
      booking.event.city
    end.uniq
  end

  def cancel_trip
    bookings.where.not(status: :cancelled).find_each do |booking|
      Stopover::BookingManagement::BookingCancellation.new(booking, booking.user).perform
    end
  end
end
