# frozen_string_literal: true

class CreateInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :interests do |t|
      t.string :title, null: false, index: { unique: true }
      t.string :slug, null: false, index: { unique: true }
      t.string :preview

      t.boolean :active, default: true

      t.timestamps
    end
  end
end
