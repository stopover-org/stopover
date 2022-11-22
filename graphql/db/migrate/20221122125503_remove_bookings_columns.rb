class RemoveBookingsColumns < ActiveRecord::Migration[7.0]
  def change
    remove_column :bookings, :name
    remove_column :bookings, :phone
    remove_column :bookings, :email
  end
end
