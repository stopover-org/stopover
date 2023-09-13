class AddStripeRefundIdToRefund < ActiveRecord::Migration[7.0]
  def change
    add_column :refunds, :stripe_refund_id, :string
  end
end
