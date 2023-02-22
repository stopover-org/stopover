class ChangeColumn < ActiveRecord::Migration[7.0]
  def change
    change_column :stripe_integrations, :unit_amount, :decimal
  end
end
