class CreatePenalties < ActiveRecord::Migration[7.0]
  def change
    create_table :penalties do |t|
      t.references :balance
      t.references :booking
      t.references :booking_cancellation_option
      t.references :refund
      t.bigint :amount_cents, null: false

      t.timestamps
    end
  end
end
