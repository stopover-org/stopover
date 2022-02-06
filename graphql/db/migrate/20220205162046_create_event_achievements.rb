# frozen_string_literal: true

class CreateEventAchievements < ActiveRecord::Migration[7.0]
  def change
    create_table :event_achievements do |t|
      t.belongs_to :event, foreign_key: true, index: true
      t.belongs_to :achievement, foreign_key: true, index: true

      t.timestamps
    end
  end
end
