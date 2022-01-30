class CreateAccountInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :account_interests do |t|
      t.belongs_to :accounts
      t.belongs_to :interests

      t.timestamps
    end

    add_index :account_interests, [:accounts_id, :interests_id], unique: true
  end
end
