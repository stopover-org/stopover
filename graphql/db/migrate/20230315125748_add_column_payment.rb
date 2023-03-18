class AddColumnPayment < ActiveRecord::Migration[7.0]
  def change
    add_reference :payments, :booking, index: true
  end
end
