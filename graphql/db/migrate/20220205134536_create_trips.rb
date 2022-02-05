class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :trip_type, null: false, index: true
      t.string :recurring_type, null: false

      t.decimal :organizer_cost_per_uom
      t.decimal :attendee_cost_per_uom

      t.boolean :requires_contract, default: false, null: false
      t.boolean :requires_passport, default: false, null: false

      t.string :recurring_days_with_time, array: true, default: []
      t.string :single_days_with_time, array: true, default: []

      t.string :duration_time

      t.string :house_number
      t.string :street
      t.string :city
      t.string :country
      t.string :region
      t.string :full_address
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
