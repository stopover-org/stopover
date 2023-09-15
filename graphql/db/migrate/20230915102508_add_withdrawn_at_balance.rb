class AddWithdrawnAtBalance < ActiveRecord::Migration[7.0]
  def change
    add_column :balances, :withdrawn_at, :timestamp
  end
end
