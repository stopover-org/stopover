# frozen_string_literal: true

class BookingOption < ApplicationRecord
  validate :has_same_event

  belongs_to :booking
  belongs_to :event_option

  before_validation :adjust_prices

  def adjust_prices
    self.attendee_price_cents = event_option&.attendee_price_cents
    self.organizer_price_cents = event_option&.organizer_price_cents
  end

  def adjust_prices!
    adjust_prices
    save!
  end

  private

  def has_same_event
    errors.add(:event_option, 'different event.id in booking and event_option') if event_option.event.id != booking.event.id
  end
end
