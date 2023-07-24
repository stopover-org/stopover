class AddVersioningToStripeIntegrations < ActiveRecord::Migration[7.0]
  def change
    add_column :stripe_integrations, :version, :integer, default: 1
  end
end
