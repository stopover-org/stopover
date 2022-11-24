class BookingOption < ApplicationRecord
  validate :has_same_event

  belongs_to :booking
  belongs_to :event_option

  private

  def has_same_event
    if event_option.event.id != booking.event.id
      errors.add(:event_option, "different event.id in booking and event_option")
    end
  end
end
