# frozen_string_literal: true

class EventOption < ApplicationRecord
  has_many :booking_options
  has_many :attendee_options
  has_many :attendees, through: :attendee_options
  has_many :bookings, through: :booking_options

  belongs_to :event

  before_validation :adjust_costs

  after_commit :update_total

  private

  def adjust_costs
    self.attendee_cost_cents = (organizer_cost_cents * (1 + ::Configuration.get_value('EVENT_MARGIN').value.to_i / 100.0)).round(
      2, :up
    )
  end

  def update_total
    booking_options.reload.each do |booking_option|
      booking_option.adjust_costs!
    end

    attendee_options.reload.each do |attendee_option|
      attendee_option.adjust_costs!
    end
  end
end
