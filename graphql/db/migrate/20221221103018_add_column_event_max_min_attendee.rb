# frozen_string_literal: true

class AddColumnEventMaxMinAttendee < ActiveRecord::Migration[7.0]
  def change
    add_column :events, :max_attendees, :integer
    add_column :events, :min_attendees, :integer, default: 0
  end
end
