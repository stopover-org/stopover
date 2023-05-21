class AddAccountFirms < ActiveRecord::Migration[7.0]
  def change
    change_table :accounts do |t|
      t.remove_references :firm
    end
    create_table :account_firms do |t|
      t.belongs_to :account, foreign_key: true, index: true
      t.belongs_to :firm, foreign_key: true, index: true

      t.timestamps
    end
  end
end
