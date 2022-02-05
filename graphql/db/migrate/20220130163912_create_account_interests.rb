# frozen_string_literal: true

class CreateAccountInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :account_interests do |t|
      t.belongs_to :account, foreign_key: true, index: true
      t.belongs_to :interest, foreign_key: true, index: true

      t.timestamps
    end

    add_index :account_interests, %i[account_id interest_id], unique: true
  end
end
