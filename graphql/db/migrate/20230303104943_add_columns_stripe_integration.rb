# frozen_string_literal: true

class AddColumnsStripeIntegration < ActiveRecord::Migration[7.0]
  def change
    add_column :stripe_integrations, :price_type, :string
  end
end
