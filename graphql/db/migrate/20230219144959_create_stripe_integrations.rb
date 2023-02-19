class CreateStripeIntegrations < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_integrations do |t|
      t.string :price_id
      t.string :product_id
      t.bigint :stripeable_id
      t.string :stripeable_type
      t.timestamps
    end

    add_index :stripe_integrations, [:stripeable_id, :stripeable_type]
  end
end
