class AddFirmTypeToFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :firm_type, :string, default: 'onboarding'
  end
end
