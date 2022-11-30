# frozen_string_literal: true

class CreateTableAttendeeOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :attendee_options do |t|
      t.belongs_to :attendee
      t.belongs_to :event_option
      t.timestamps
    end
  end
end
