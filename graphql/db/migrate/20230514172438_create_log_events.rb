# frozen_string_literal: true

class CreateLogEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :log_events do |t|
      t.string :event_type, null: false, default: 'common'
      t.string :level, null: false, default: 'info'
      t.text :content

      t.timestamps
    end
  end
end
