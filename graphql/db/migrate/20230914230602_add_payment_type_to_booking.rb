class AddPaymentTypeToBooking < ActiveRecord::Migration[7.0]
  def change
    add_column :bookings, :payment_type, :string
  end
end
