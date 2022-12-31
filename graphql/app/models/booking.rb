# frozen_string_literal: true

# == Schema Information
#
# Table name: bookings
#
#  id         :bigint           not null, primary key
#  booked_for :datetime         not null
#  status     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  event_id   :bigint
#  trip_id    :bigint
#
# Indexes
#
#  index_bookings_on_event_id  (event_id)
#  index_bookings_on_trip_id   (trip_id)
#
class Booking < ApplicationRecord
  include AASM

  belongs_to :event
  belongs_to :trip

  has_many :booking_options, dependent: :destroy
  has_many :event_options, through: :booking_options
  has_many :attendees

  validate :validate_booked_for
  validate :check_max_attendees

  before_validation :create_trip, if: :should_create_trip
  before_validation :create_attendee
  before_validation :validate_booked_for
  before_create :create_booking_options

  aasm column: :status do
    state :active, initial: true
    state :paid

    event :paid do
      transitions from: :active, to: :paid
    end
  end
  def validate_booked_for
    errors.add(:booked_for, 'is invalid') unless event&.schedules&.exists?(scheduled_for: booked_for)
  end

  def check_max_attendees
    return true if event.max_attendees.nil?
    errors.add(:attendees, 'to much attendees, no place for them on event') unless Attendee.where(booking_id: Booking.where(event_id: event_id, booked_for: booked_for)).count + attendees.count < event.max_attendees
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
    Trip.create(bookings: [self])
  end
end
