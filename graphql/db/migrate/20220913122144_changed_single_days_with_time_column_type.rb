class ChangedSingleDaysWithTimeColumnType < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :single_days_with_time
    add_column :events, :single_days_with_time, :timestamp, array: true, default: []
  end
end
