class RemoveCoulumnReccuringType < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :recurring_type
  end
end
