# frozen_string_literal: true

class Booking < ApplicationRecord
  has_many :booking_event_options, dependent: :destroy

  belongs_to :event
  has_many :event_options, through: :booking_event_options
  belongs_to :trip

  has_many :attendees

  before_validation :create_trip, if: :should_create_trip

  private
    def should_create_trip
      !trip
    end

    def create_trip
      Trip.create(bookings: [self])
    end
end