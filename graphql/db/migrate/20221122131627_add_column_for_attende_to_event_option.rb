# frozen_string_literal: true

class AddColumnForAttendeToEventOption < ActiveRecord::Migration[7.0]
  def change
    add_column :event_options, :for_attendee, :boolean, default: false
  end
end
