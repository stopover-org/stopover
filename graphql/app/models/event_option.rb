# frozen_string_literal: true

class EventOption < ApplicationRecord
  has_many :booking_event_options, dependent: :destroy
  has_many :attendee_options
  has_many :attendees, through: :attendee_options

  belongs_to :event
  has_many :bookings, through: :booking_event_options
end
