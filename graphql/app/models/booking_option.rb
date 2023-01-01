# frozen_string_literal: true

# == Schema Information
#
# Table name: booking_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  booking_id            :bigint
#  event_option_id       :bigint
#
# Indexes
#
#  index_booking_options_on_booking_id       (booking_id)
#  index_booking_options_on_event_option_id  (event_option_id)
#
# Foreign Keys
#
#  fk_rails_...  (booking_id => bookings.id)
#  fk_rails_...  (event_option_id => event_options.id)
#
class BookingOption < ApplicationRecord
  # MODULES ===============================================================
  #
  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  #
  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :booking
  belongs_to :event_option

  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validate :has_same_event

  # CALLBACKS ================================================================
  before_validation :adjust_prices

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def adjust_prices
    self.attendee_price_cents = event_option&.attendee_price_cents
    self.organizer_price_cents = event_option&.organizer_price_cents
  end

  def adjust_prices!
    adjust_prices
    save!
  end

  private

  def has_same_event
    errors.add(:event_option, 'different event.id in booking and event_option') if event_option.event.id != booking.event.id
  end
end
