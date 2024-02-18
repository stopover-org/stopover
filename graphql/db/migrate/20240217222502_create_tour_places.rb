class CreateTourPlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :tour_places do |t|
      t.references :firm
      t.references :event
      t.references :tour_plan

      t.string :title
      t.string :duration_time
      t.text :description

      t.timestamps
    end
  end
end
