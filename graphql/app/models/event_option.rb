# frozen_string_literal: true

class EventOption < ApplicationRecord
  has_many :booking_options
  has_many :attendee_options
  has_many :attendees, through: :attendee_options

  belongs_to :event
  has_many :bookings, through: :booking_options
  
  after_commit :update_total
  private

  def update_total
    booking_options.each do |booking_option|
      booking_option.adjust_costs
    end
    attendee_options.each do |attendee_option|
      attendee_option.adjust_costs
    end
  end
end
