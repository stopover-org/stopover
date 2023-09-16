class AddFirmEventToAttendee < ActiveRecord::Migration[7.0]
  def change
    add_reference :attendees, :firm
    add_reference :attendees, :event
    add_reference :attendees, :schedule
  end
end
