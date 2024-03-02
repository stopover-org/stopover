# frozen_string_literal: true

# == Schema Information
#
# Table name: booking_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  status                :string           default("available")
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  booking_id            :bigint
#  event_option_id       :bigint
#  stripe_integration_id :bigint
#
# Indexes
#
#  index_booking_options_on_booking_id             (booking_id)
#  index_booking_options_on_event_option_id        (event_option_id)
#  index_booking_options_on_stripe_integration_id  (stripe_integration_id)
#
# Foreign Keys
#
#  fk_rails_...  (booking_id => bookings.id)
#  fk_rails_...  (event_option_id => event_options.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
class BookingOption < ApplicationRecord
  GRAPHQL_TYPE = Types::BookingsRelated::BookingOptionType

  # MODULES ===============================================================
  include Mixins::OptionStatuses

  # MONETIZE =====================================================================
  monetize :attendee_price_cents
  monetize :organizer_price_cents

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  #
  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :stripe_integrations, through: :event_option

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :booking
  belongs_to :event_option
  belongs_to :stripe_integration

  has_one :firm, through: :booking

  # AASM STATES ================================================================
  #
  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validate :validate_event
  validate :validate_option_type

  # CALLBACKS ================================================================
  before_validation :adjust_prices
  before_validation :adjust_stripe_integration, on: :create

  # SCOPES =====================================================================
  default_scope { in_order_of(:status, %w[available not_available]).order(created_at: :desc) }

  # DELEGATIONS ==============================================================

  def adjust_prices
    self.attendee_price = event_option&.attendee_price
    self.organizer_price = event_option&.organizer_price
  end

  def adjust_prices!
    return unless booking.payments.where(status: %i[successful]).empty?
    adjust_prices
    save!
  end

  private

  def validate_option_type
    errors.add(:event_option, 'wrong type') if event_option.for_attendee
  end

  def validate_event
    errors.add(:event_option, 'belongs to different event') if event_option&.event&.id != booking&.event&.id
  end

  def adjust_stripe_integration
    self.stripe_integration = event_option.current_stripe_integration
  end
end
