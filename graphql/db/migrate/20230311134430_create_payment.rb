class CreatePayment < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.belongs_to :stripe_integration
      t.string :checkout_id
      t.string :success_url
      t.string :cancel_url
      t.timestamps
    end
  end
end
