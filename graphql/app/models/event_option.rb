# frozen_string_literal: true

# == Schema Information
#
# Table name: event_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  built_in              :boolean          default(FALSE)
#  description           :text
#  for_attendee          :boolean          default(FALSE)
#  organizer_price_cents :decimal(, )      default(0.0)
#  title                 :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint           not null
#
# Indexes
#
#  index_event_options_on_event_id  (event_id)
#
class EventOption < ApplicationRecord
  # MODULES ===============================================================
  #
  # MONETIZE =====================================================================
  monetize :attendee_price_cents
  monetize :organizer_price_cents

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS =========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :booking_options
  has_many :attendee_options
  has_many :stripe_integrations, as: :stripeable

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :attendees, through: :attendee_options
  has_many :bookings, through: :booking_options

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event

  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validates :organizer_price_cents, presence: true
  validates :attendee_price_cents, presence: true

  # CALLBACKS ================================================================
  before_validation :adjust_prices
  after_commit :update_total
  after_commit :sync_stripe

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def sync_stripe
    StripeIntegrator.sync(self)
  end

  private

  def adjust_prices
    self.attendee_price = (organizer_price * (1 + (::Configuration.get_value('EVENT_MARGIN').value.to_i / 100.0))).round(
      2, BigDecimal::ROUND_UP
    )
  end

  def update_total
    booking_options.reload.each(&:adjust_prices!)

    attendee_options.reload.each do |attendee_option|
      attendee_option.adjust_prices!
    end
  end
end
