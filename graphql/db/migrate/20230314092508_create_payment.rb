class CreatePayment < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.string :status
      t.decimal :total_price_cents, default: 0
      t.belongs_to :balance

      t.timestamps
    end
  end
end
