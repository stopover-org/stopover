class AddColumnAccountFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :stripe_account_id, :string
  end
end
