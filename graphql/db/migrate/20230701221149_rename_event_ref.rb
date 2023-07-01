class RenameEventRef < ActiveRecord::Migration[7.0]
  def change
    remove_index :events, :external_id
    rename_column :events, :external_id, :ref_number
    add_index :events, [:ref_number, :firm_id], unique: true
    add_index :firms, :ref_number, unique: true
  end
end
