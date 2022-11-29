# frozen_string_literal: true

class Booking < ApplicationRecord
include AASM
  has_many :booking_options, dependent: :destroy

  belongs_to :event
  has_many :event_options, through: :booking_options
  belongs_to :trip

  has_many :attendees

  before_validation :create_trip, if: :should_create_trip
  before_create :create_booking_options
  before_validation :create_attendee

  aasm column: :status do
    state :active, initial: true
    state :paid

    event :paid do
      transitions from: :active, to: :paid
    end
  end

  private
    def create_booking_options
      event.event_options.where(built_in: true, for_attendee: false).each do |event_option|
        booking_options.build(event_option: event_option)
      end
    end

    
    def create_attendee
      attendees.build(first_name: "guest") if attendees.empty?
    end
    
    def should_create_trip
      !trip
    end
    def create_trip
      Trip.create(bookings: [self])
    end
end