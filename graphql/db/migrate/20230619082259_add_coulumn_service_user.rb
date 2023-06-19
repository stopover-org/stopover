class AddCoulumnServiceUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :service_user, :boolean, default: false
  end
end
