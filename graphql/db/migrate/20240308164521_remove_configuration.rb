class RemoveConfiguration < ActiveRecord::Migration[7.0]
  def change
    drop_table :configurations
  end
end
