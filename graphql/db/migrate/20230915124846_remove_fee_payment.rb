class RemoveFeePayment < ActiveRecord::Migration[7.0]
  def change
    remove_column :payments, :fee_cents, :bigint
  end
end
