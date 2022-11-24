class RenameBookingEventOption < ActiveRecord::Migration[7.0]
  def change
    rename_table('booking_event_options', 'booking_options')
  end
end
