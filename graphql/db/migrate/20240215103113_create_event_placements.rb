class CreateEventPlacements < ActiveRecord::Migration[7.0]
  def change
    create_table :event_placements do |t|
      t.references :firm
      t.references :event
      t.string :title
      t.integer :width_places, default: 0
      t.integer :height_places, default: 0
      t.jsonb :places, default: {}

      t.timestamps
    end
  end
end
