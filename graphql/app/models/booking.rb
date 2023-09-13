# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id                    :bigint           not null, primary key
#  status                :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  event_id              :bigint
#  schedule_id           :bigint
#  stripe_integration_id :bigint
#  trip_id               :bigint
#
# Indexes
#
#  index_bookings_on_event_id               (event_id)
#  index_bookings_on_schedule_id            (schedule_id)
#  index_bookings_on_stripe_integration_id  (stripe_integration_id)
#  index_bookings_on_trip_id                (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
#  fk_rails_...  (stripe_integration_id => stripe_integrations.id)
#
class Booking < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # MONETIZE ==============================================================

  # BELONGS_TO ASSOCIATIONS ===============================================
  belongs_to :event
  belongs_to :trip
  belongs_to :schedule
  belongs_to :stripe_integration

  # HAS_ONE ASSOCIATIONS ==================================================

  # HAS_ONE THROUGH ASSOCIATIONS ==========================================
  has_one :firm,    through: :event
  has_one :account, through: :trip
  has_one :user,    through: :account

  # HAS_MANY ASSOCIATIONS =================================================
  has_many :booking_options,  dependent: :destroy
  has_many :attendees,        dependent: :destroy
  has_many :payments,         dependent: :nullify
  has_many :refunds,          dependent: :nullify

  # HAS_MANY THROUGH ASSOCIATIONS =========================================
  has_many :attendee_options,             through: :attendees
  has_many :booking_cancellation_options, through: :event
  has_many :event_options,                through: :event

  # AASM STATES ===========================================================
  aasm column: :status do
    state :active, initial: true
    state :cancelled
    state :paid

    event :pay do
      transitions from: :active, to: :paid
    end

    event :partially_pay do
      transitions from: :paid, to: :active
    end

    event :cancel do
      transitions from: %i[active paid], to: :cancelled, guard: :can_cancel
    end
  end

  # ENUMS =================================================================

  # SECURE TOKEN ==========================================================

  # SECURE PASSWORD =======================================================

  # ATTACHMENTS ===========================================================

  # RICH_TEXT =============================================================

  # VALIDATIONS ===========================================================
  validate :check_max_attendees

  # CALLBACKS =============================================================
  before_validation :create_attendee
  before_validation :adjust_stripe_integration, on: :create
  before_validation :create_booking_options,    on: :create
  after_commit :refund_diff, if: :refundable?

  # SCOPES ================================================================

  # DELEGATION ============================================================

  def check_max_attendees
    return true if event.max_attendees.nil?
    reached_max_attendees = if schedule
                              Attendee.where.not(status: 'removed')
                                      .where(booking_id: Booking.where(schedule_id: schedule.reload.id)
                                                                .where.not(status: 'cancelled')
                                                                .where.not(id: id))
                                      .count + attendees.where.not(status: 'removed').count > event.max_attendees
                            else
                              attendees.where.not(status: 'removed').count > event.max_attendees
                            end
    errors.add(:attendees, 'all places reserved') if reached_max_attendees
  end

  def attendee_total_price
    event_price = event.attendee_price_per_uom * attendees.where.not(status: 'removed').count

    booking_options_price = booking_options.sum(Money.new(0)) { |opt| opt.event_option.built_in || opt.not_available? ? 0 : opt.attendee_price }
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |opt|
        res += if opt.event_option.built_in || opt.not_available?
                 0
               else
                 opt.attendee_price
               end
      end

      res
    end

    event_price + booking_options_price + attendee_options_price
  end

  def organizer_total_price
    event_price = event.organizer_price_per_uom * attendees.where.not(status: 'removed').count
    booking_options_price = booking_options.sum(Money.new(0)) { |opt| opt.event_option.built_in || opt.not_available? ? 0 : opt.organizer_price }
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |opt|
        res += if opt.event_option.built_in || opt.not_available?
                 0
               else
                 opt.organizer_price
               end
      end

      res
    end

    event_price + booking_options_price + attendee_options_price
  end

  def left_to_pay_price
    attendee_total_price - already_paid_price
  end

  def left_to_pay_deposit_price
    event.deposit_amount - already_paid_price
  end

  def already_paid_price
    total_payments = payments.where.not(status: %i[cancelled pending processing]).map(&:total_price).sum(Money.new(0))
    total_refunds = refunds.where.not(status: :cancelled).map(&:total_amount).sum(Money.new(0))

    total_payments - total_refunds
  end

  def past?
    schedule.scheduled_for.past?
  end

  def refundable?
    already_paid_price > attendee_total_price
  end

  def partially_paid?
    left_to_pay_price.positive?
  end

  def refund_diff
    refunds.create!(firm: firm, refund_amount: already_paid_price - attendee_total_price, penalty_amount: Money.new(0))
  end

  private

  def can_cancel
    payments.processing.empty?
  end

  def create_booking_options
    event.event_options.available.where(built_in: true, for_attendee: false).find_each do |event_option|
      booking_options.build(event_option: event_option)
    end
  end

  def create_attendee
    attendees.build if attendees.empty?
  end

  def adjust_stripe_integration
    self.stripe_integration = event.current_stripe_integration
  end
end
