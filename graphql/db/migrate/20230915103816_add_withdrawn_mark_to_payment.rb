class AddWithdrawnMarkToPayment < ActiveRecord::Migration[7.0]
  def change
    add_column :payments, :withdrawn_at, :timestamp
    add_column :payments, :withdrawn_cents, :bigint, default: 0
  end
end
