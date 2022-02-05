# frozen_string_literal: true

class CreateTripAchievements < ActiveRecord::Migration[7.0]
  def change
    create_table :trip_achievements do |t|
      t.references :trip
      t.references :achievement

      t.timestamps
    end

    add_index :trip_achievements, %i[trip_id achievement_id], unique: true
  end
end
