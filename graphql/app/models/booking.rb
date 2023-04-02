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

  # ATTACHMENTS ===========================================================
  #
  # HAS_ONE ASSOCIATIONS ==========================================================
  #
  # HAS_MANY ASSOCIATIONS =========================================================
  has_many :booking_options, dependent: :destroy
  has_many :attendees, dependent: :destroy
  has_many :payments, dependent: :destroy

  # HAS_MANY :THROUGH ASSOCIATIONS ================================================
  has_many :event_options, through: :booking_options
  has_many :attendee_options, through: :attendees
  has_many :booking_cancellation_options, through: :event

  # BELONGS_TO ASSOCIATIONS =======================================================
  belongs_to :event
  belongs_to :trip
  belongs_to :schedule

  # AASM STATES ================================================================
  aasm column: :status do
    state :active, initial: true
    state :paid

    event :paid do
      transitions from: :active, to: :paid
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
    errors.add(:attendees, 'all places reserved') if Attendee.where(booking_id: Booking.where(schedule_id: schedule.id)).count + attendees.count > event.max_attendees
  end

  def attendee_total_price
    event_price = event.attendee_price_per_uom * attendees.count
    booking_options_price = booking_options.sum(&:attendee_price)
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |att_opt|
        res += att_opt.attendee_price
      end

      res
    end

    event_price + booking_options_price + attendee_options_price
  end

  def organizer_total_price
    event_price = event.organizer_price_per_uom * attendees.count
    booking_options_price = booking_options.sum(&:organizer_price)
    attendee_options_price = attendees.sum(Money.new(0)) do |att|
      res = Money.new(0)
      att.attendee_options.each do |att_opt|
        res += att_opt.organizer_price
      end

      res
    end

    event_price + booking_options_price + attendee_options_price
  end

  private

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
