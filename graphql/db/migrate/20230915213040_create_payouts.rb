class CreatePayouts < ActiveRecord::Migration[7.0]
  def change
    create_table :payouts do |t|
      t.references :firm
      t.references :balance
      t.references :payment
      t.decimal :total_amount_cents
      t.string :status
      t.timestamp :completed_at

      t.timestamps
    end

    remove_column :payments, :withdrawn_at, :timestamp
    remove_column :payments, :withdrawn_cents, :decimal
    rename_column :balances, :withdrawn_at, :last_payout_at
    add_reference :payments, :firm
  end
end
