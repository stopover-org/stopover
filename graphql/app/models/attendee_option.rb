# frozen_string_literal: true

class AttendeeOption < ApplicationRecord
  belongs_to :attendee
  belongs_to :event_option

  before_validation :adjust_prices

  def adjust_prices
    self.attendee_price_cents = event_option.attendee_price_cents
    self.organizer_price_cents = event_option.organizer_price_cents
  end

  def adjust_prices!
    adjust_prices
    save!
  end
end
