class AddPaymentTypeToFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :payment_types, :string, array: true, default: [], null: false
  end
end
