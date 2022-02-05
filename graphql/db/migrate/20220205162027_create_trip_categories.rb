# frozen_string_literal: true

class CreateTripCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :trip_categories do |t|
      t.references :trip
      t.references :category

      t.timestamps
    end
    add_index :trip_categories, %i[trip_id category_id], unique: true
  end
end
