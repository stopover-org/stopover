class AddNotificationTypeNotification < ActiveRecord::Migration[7.0]
  def change
    add_column :notifications, :notification_type, :string, default: 'system'
    add_reference :notifications, :firm
    add_reference :notifications, :booking
  end
end
