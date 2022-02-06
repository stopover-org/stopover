# frozen_string_literal: true

class CreateUnits < ActiveRecord::Migration[7.0]
  def change
    create_table :units do |t|
      t.string :name, null: false
      t.string :unit_type, null: false, default: 'common'
      t.string :preview

      t.timestamps
    end

    add_reference :trips, :unit, foreign_key: true
  end
end
