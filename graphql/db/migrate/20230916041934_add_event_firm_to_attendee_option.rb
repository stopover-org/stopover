class AddEventFirmToAttendeeOption < ActiveRecord::Migration[7.0]
  def change
    add_reference :attendee_options, :firm
    add_reference :attendee_options, :event
    add_reference :attendee_options, :schedule
    add_reference :attendee_options, :booking
  end
end
