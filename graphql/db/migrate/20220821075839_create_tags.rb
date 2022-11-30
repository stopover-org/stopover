# frozen_string_literal: true

class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :title, null: false
      t.string :preview

      t.timestamps
    end

    create_table :event_tags do |t|
      t.belongs_to :tag
      t.belongs_to :event

      t.timestamps
    end
  end
end
