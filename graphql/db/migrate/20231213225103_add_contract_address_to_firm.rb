class AddContractAddressToFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :contract_address, :string
  end
end
