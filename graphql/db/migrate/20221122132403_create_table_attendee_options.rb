class CreateTableAttendeeOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :attendee_options do |t|
      t.belongs_to :attendees
      t.belongs_to :event_options
      t.timestamps
    end
  end
end
