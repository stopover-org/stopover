class ChangePrimaryNotificationMethodAccount < ActiveRecord::Migration[7.0]
  def change
    remove_column :accounts, :primary_phone, :string
    add_column :accounts, :primary_notification_method, :string
  end
end
