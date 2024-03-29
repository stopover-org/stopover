# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, index: { unique: true }, null: true
      t.string :phone, index: { unique: true }, null: true

      t.string :confirmation_code
      t.string :status, null: false

      t.datetime :disabled_at
      t.datetime :confirmed_at
      t.datetime :last_try

      t.timestamps
    end
  end
end
