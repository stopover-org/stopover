# frozen_string_literal: true

class BookingOption < ApplicationRecord
  validate :has_same_event

  belongs_to :booking
  belongs_to :event_option

  before_validation :adjust_costs

  def adjust_costs
    self.attendee_cost_cents = event_option&.attendee_cost_cents
    self.organizer_cost_cents = event_option&.organizer_cost_cents
  end

  def adjust_costs!
    adjust_costs
    save!
  end

  private

  def has_same_event
    errors.add(:event_option, 'different event.id in booking and event_option') if event_option.event.id != booking.event.id
  end
end
