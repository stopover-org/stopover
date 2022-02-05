class CreateAccountInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :account_interests do |t|
      t.belongs_to :account
      t.belongs_to :interest

      t.timestamps
    end

    add_index :account_interests, [:account_id, :interest_id], unique: true
  end
end
