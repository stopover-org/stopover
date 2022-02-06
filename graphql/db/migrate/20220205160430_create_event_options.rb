# frozen_string_literal: true

class CreateEventOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :event_options do |t|
      t.string :title
      t.decimal :organizer_cost_cents
      t.decimal :attendee_cost_cents
      t.boolean :built_in, default: false

      t.references :event, null: false

      t.timestamps
    end
  end
end
