class AddColumnsStripeIntegration < ActiveRecord::Migration[7.0]
  def change
    add_column :stripe_integrations, :amount_type, :string
  end
end
