# frozen_string_literal: true

class AddStatusStripeIntegration < ActiveRecord::Migration[7.0]
  def change
    add_column :stripe_integrations, :status, :string
  end
end
