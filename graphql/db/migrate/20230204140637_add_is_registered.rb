class AddIsRegistered < ActiveRecord::Migration[7.0]
  def change
    add_column :attendees, :is_registered, :boolean, default: false
  end
end
