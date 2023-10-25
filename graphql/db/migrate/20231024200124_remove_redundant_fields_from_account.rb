class RemoveRedundantFieldsFromAccount < ActiveRecord::Migration[7.0]
  def change
    remove_column :accounts, :last_name, :string
  end
end
