# frozen_string_literal: true

# == Schema Information
#
# Table name: attendee_options
#
#  id                    :bigint           not null, primary key
#  attendee_price_cents  :decimal(, )      default(0.0)
#  organizer_price_cents :decimal(, )      default(0.0)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  attendee_id           :bigint
#  event_option_id       :bigint
#
# Indexes
#
#  index_attendee_options_on_attendee_id      (attendee_id)
#  index_attendee_options_on_event_option_id  (event_option_id)
#
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