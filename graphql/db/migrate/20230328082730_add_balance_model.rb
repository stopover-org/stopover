# frozen_string_literal: true

class AddBalanceModel < ActiveRecord::Migration[7.0]
  def change
    create_table :balances do |t|
      t.belongs_to :firm
      t.decimal :total_amount_cents, default: 0
      t.timestamps
    end
  end
end
