class AddAvailablePaymentsToFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :available_payment_methods, :string, array: true, default: [], null: false
  end
end
