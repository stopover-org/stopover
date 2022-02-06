# frozen_string_literal: true

class CreateEventInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :event_interests do |t|
      t.belongs_to :event, foreign_key: true, index: true
      t.belongs_to :interest, foreign_key: true, index: true

      t.timestamps
    end
  end
end
