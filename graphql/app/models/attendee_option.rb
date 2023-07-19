# frozen_string_literal: true

# == Schema Information
#
# Table name: attendee_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  attendee_id           :bigint
#  event_option_id       :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id      (attendee_id)
#  index_attendee_options_on_event_option_id  (event_option_id)
#
class AttendeeOption < ApplicationRecord
  # MODULES ======================================================================
  include AASM

  # MONETIZE =====================================================================
  monetize :attendee_price_cents
  monetize :organizer_price_cents

  # ATTACHMENTS ==================================================================
  #
  # HAS_ONE ASSOCIATIONS =========================================================
  #
  # HAS_MANY ASSOCIATIONS ========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :stripe_integrations, through: :event_option

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :attendee
  belongs_to :event_option

  # AASM STATES ================================================================
  aasm column: :status do
    state :available, initial: true
    state :not_available

    event :disable do
      transitions from: :available, to: :not_available
    end

    event :restore do
      transitions from: :not_available, to: :available
    end
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validate :event_option_has_for_attendee

  # CALLBACKS ================================================================
  before_validation :adjust_prices

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def event_option_has_for_attendee
    errors.add(:attendee_option, 'event option is not for attendee') unless event_option&.for_attendee
  end

  def adjust_prices
    self.attendee_price = event_option&.attendee_price
    self.organizer_price = event_option&.organizer_price
  end

  def adjust_prices!
    return if attendee.booking.payments.where(status: %i[successful]).any?
    adjust_prices
    save!
  end
end
