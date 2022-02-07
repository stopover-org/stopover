# frozen_string_literal: true

class EventOption < ApplicationRecord
  has_many :booking_event_options, dependent: :destroy

  belongs_to :event
  has_many :bookings, through: :booking_event_options
end
