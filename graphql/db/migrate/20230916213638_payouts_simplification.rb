class PayoutsSimplification < ActiveRecord::Migration[7.0]
  def change
    remove_column :payouts, :payment_id, :bigint
  end
end
