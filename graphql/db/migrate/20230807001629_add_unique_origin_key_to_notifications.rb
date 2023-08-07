class AddUniqueOriginKeyToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_column :notifications, :origin_key, :string, null: false
  end
end
