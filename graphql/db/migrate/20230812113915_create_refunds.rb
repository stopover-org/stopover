class CreateRefunds < ActiveRecord::Migration[7.0]
  def change
    create_table :refunds do |t|
      t.bigint :amount_cents, null: false
      t.references :balance
      t.references :booking
      t.string :author, null: false
      t.string :status, null: false, default: 'pending'

      t.timestamps
    end
  end
end
