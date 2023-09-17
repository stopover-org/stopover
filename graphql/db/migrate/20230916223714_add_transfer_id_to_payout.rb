class AddTransferIdToPayout < ActiveRecord::Migration[7.0]
  def change
    add_column :payouts, :stripe_transfer_id, :string
    add_column :payouts, :sent_at, :timestamp
  end
end
