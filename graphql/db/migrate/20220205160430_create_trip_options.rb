class CreateTripOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :trip_options do |t|
      t.string :title
      t.decimal :organizer_cost_cents
      t.decimal :attendee_cost_cents
      t.boolean :built_id, default: false

      t.references :trip, null: false

      t.timestamps
    end
  end
end
