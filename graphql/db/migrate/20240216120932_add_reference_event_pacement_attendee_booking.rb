class AddReferenceEventPacementAttendeeBooking < ActiveRecord::Migration[7.0]
  def change
    add_reference :attendees, :event_placement
    add_column :attendees, :place, :integer, array: true, default: []
  end
end
