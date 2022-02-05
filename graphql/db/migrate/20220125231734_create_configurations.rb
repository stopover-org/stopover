# frozen_string_literal: true

class CreateConfigurations < ActiveRecord::Migration[7.0]
  def change
    create_table :configurations do |t|
      t.string :value
      t.string :key, index: true
      t.string :description

      t.timestamps
    end
  end
end
