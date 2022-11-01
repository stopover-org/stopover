# frozen_string_literal: true

class Booking < ApplicationRecord
  has_many :booking_event_options, dependent: :destroy

  belongs_to :event
  has_many :event_options, through: :booking_event_options
  belongs_to :trip
end