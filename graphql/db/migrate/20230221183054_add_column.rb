class AddColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :stripe_integrations, :name, :string
    add_column :stripe_integrations, :unit_amount, :integer
  end
end
