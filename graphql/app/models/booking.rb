# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id          :bigint           not null, primary key
#  status      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  event_id    :bigint
#  schedule_id :bigint
#  trip_id     :bigint
#
# Indexes
#
#  index_bookings_on_event_id     (event_id)
#  index_bookings_on_schedule_id  (schedule_id)
#  index_bookings_on_trip_id      (trip_id)
#
# Foreign Keys
#
#  fk_rails_...  (schedule_id => schedules.id)
#
class Booking < ApplicationRecord
  # MODULES ===============================================================
  include AASM

  # MONETIZE =====================================================================
  monetize :organizer_total_price_cents

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================

  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :booking_options,  dependent: :destroy
  has_many :attendees,        dependent: :destroy
  has_many :payments,         dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :attendee_options, through: :attendees

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event
  belongs_to :trip
  belongs_to :schedule

  has_one :account, through: :trip

  has_one :user,    through: :account

  has_many :booking_cancellation_options, through: :event

  has_many :event_options,
           -> { where(for_attendee: false) },
           through: :event
  # AASM STATES ================================================================
  aasm column: :status do
    state :active, initial: true
    state :cancelled
    state :paid

    event :paid do
      transitions from: :active, to: :paid
    end

    event :cancel do
      transitions from: %i[active paid], to: :cancelled, guard: :can_cancel
    end
  end

  # ENUMS =======================================================================
  #
  # VALIDATIONS ================================================================
  validate :check_max_attendees

  # CALLBACKS ================================================================
  before_validation :create_trip, if: :should_create_trip
  before_validation :create_attendee
  before_create :create_booking_options

  # SCOPES =====================================================================
  #
  # DELEGATIONS ==============================================================

  def check_max_attendees
    return true if event.max_attendees.nil?
    errors.add(:attendees, 'all places reserved') if Attendee.where(booking_id: Booking.where(schedule_id: schedule.reload.id)).count + attendees.count > event.max_attendees
  end

  def attendee_total_price
    event_price = event.attendee_price_per_uom * attendees.count

    booking_options_price = booking_options.sum(Money.new(0)) { |opt| opt.event_option.built_in ? 0 : opt.attendee_price }
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |opt|
        res += if opt.event_option.built_in
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
    event_price = event.organizer_price_per_uom * attendees.count
    booking_options_price = booking_options.sum(Money.new(0)) { |opt| opt.event_option.built_in ? 0 : opt.organizer_price }
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |opt|
        res += if opt.event_option.built_in
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

  def already_paid_price
    payments.successful.map(&:total_price).sum(Money.new(0))
  end

  private

  def can_cancel
    !paid?
  end

  def create_booking_options
    event.event_options.where(built_in: true, for_attendee: false).find_each do |event_option|
      booking_options.build(event_option: event_option)
    end
  end

  def create_attendee
    attendees.build(first_name: 'guest') if attendees.empty?
  end

  def should_create_trip
    !trip
  end

  def create_trip
    # TODO: make bang create
    # to raise an error
    Trip.create(bookings: [self])
  end
end
