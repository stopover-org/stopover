class BookingEventOption < ApplicationRecord
  validate :

  def has_same_event
    if bookings.event_option.event.id !== booking.event.id
      errors.add(:event_option, "different event.id in booking and event_option")
    end
  end
  belongs_to :booking
  belongs_to :event_option
end
