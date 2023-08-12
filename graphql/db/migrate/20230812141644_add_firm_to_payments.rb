class AddFirmToPayments < ActiveRecord::Migration[7.0]
  def change
    add_reference :payments, :firm
  end
end
