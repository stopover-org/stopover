class AddPaymentIntentToPayment < ActiveRecord::Migration[7.0]
  def change
    add_column :payments, :payment_intent_id, :string
  end
end
