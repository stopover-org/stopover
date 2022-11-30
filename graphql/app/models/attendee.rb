# frozen_string_literal: true

class Attendee < ApplicationRecord
  belongs_to :booking
  has_many :attendee_options
  has_many :event_options, through: :attendee_options

  before_create :create_attendee_options

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def create_attendee_options
    booking.event.event_options.where(built_in: true, for_attendee: true).find_each do |event_option|
      attendee_options.build(event_option: event_option)
    end
  end
end
