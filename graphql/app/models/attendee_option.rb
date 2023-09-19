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
#  booking_id            :bigint
#  event_id              :bigint
#  event_option_id       :bigint
#  firm_id               :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id            (attendee_id)
#  index_attendee_options_on_booking_id             (booking_id)
#  index_attendee_options_on_event_id               (event_id)
#  index_attendee_options_on_event_option_id        (event_option_id)
#  index_attendee_options_on_firm_id                (firm_id)
#  index_attendee_options_on_schedule_id            (schedule_id)
#  index_attendee_options_on_stripe_integration_id  (stripe_integration_id)
#
# Foreign Keys
#
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
class AttendeeOption < ApplicationRecord
  GRAPHQL_TYPE = Types::BookingsRelated::AttendeeOptionType

  # MODULES ===============================================================
  include Mixins::OptionStatuses

  # MONETIZE ==============================================================
  monetize :attendee_price_cents
  monetize :organizer_price_cents

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :attendee
  belongs_to :booking
  belongs_to :event_option
  belongs_to :event
  belongs_to :firm
  belongs_to :schedule
  belongs_to :stripe_integration

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================

  # HAS_MANY ASSOCIATIONS =================================================

  # HAS_MANY THROUGH ASSOCIATIONS =========================================

  # AASM STATES ===========================================================

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validate :validate_option_type

  # CALLBACKS =============================================================
  before_validation :adjust_prices, on: :create
  before_validation :adjust_event_option_info

  # SCOPES ================================================================

  # DELEGATION ============================================================
  def validate_option_type
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

  private

  def adjust_event_option_info
    self.booking = attendee&.booking unless booking
    self.event = event_option&.event unless event
    self.firm = event&.firm unless firm
    self.schedule = booking&.schedule unless schedule
    self.stripe_integration = event_option&.current_stripe_integration unless stripe_integration
  end
end
