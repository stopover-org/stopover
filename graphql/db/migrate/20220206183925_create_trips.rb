class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.belongs_to :account
      t.date :start_date
      t.date :end_date

      t.string :city
      t.string :country
      t.string :region
      t.string :full_address
      t.float :longitude
      t.float :latitude

      t.string :status, null: false

      t.timestamps
    end

    add_reference :bookings, :trip
  end
end
