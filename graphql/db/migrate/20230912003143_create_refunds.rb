class CreateRefunds < ActiveRecord::Migration[7.0]
  def change
    create_table :refunds do |t|
      t.references :booking_cancellation_option
      t.references :payment
      t.references :booking
      t.references :account
      t.references :firm
      t.string :status, default: 'pending', null: false
      t.decimal :refund_amount_cents, default: 0, null: false
      t.decimal :penalty_amount_cents, default: 0, null: false

      t.timestamps
    end
  end
end
