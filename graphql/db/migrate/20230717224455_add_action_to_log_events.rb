class AddActionToLogEvents < ActiveRecord::Migration[7.0]
  def change
    add_column :log_events, :action, :string
    add_column :log_events, :notification_type, :string
  end
end
