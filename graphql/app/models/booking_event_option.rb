# frozen_string_literal: true

class BookingEventOption < ApplicationRecord
  belongs_to :booking
  belongs_to :event_option

  validates :description, length: { maximum: 125 }
end
