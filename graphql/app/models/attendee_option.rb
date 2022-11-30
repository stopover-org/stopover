# frozen_string_literal: true

class AttendeeOption < ApplicationRecord
  belongs_to :attendee
  belongs_to :event_option

  before_validation :adjust_costs

  def adjust_costs
    self.attendee_cost_cents = event_option.attendee_cost_cents
    self.organizer_cost_cents = event_option.organizer_cost_cents
  end

  def adjust_costs!
    adjust_costs
    save!
  end
end
