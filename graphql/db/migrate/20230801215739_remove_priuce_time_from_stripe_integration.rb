class RemovePriuceTimeFromStripeIntegration < ActiveRecord::Migration[7.0]
  def change
    remove_column :stripe_integrations, :price_type, :string
  end
end
