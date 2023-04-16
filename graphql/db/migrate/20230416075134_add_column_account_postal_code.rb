class AddColumnAccountPostalCode < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :postal_code, :string
    add_column :accounts, :date_of_birth, :datetime
    add_column :accounts, :last_name, :string

    add_column :firms, :business_type, :string,default: 'individual', null: false
    add_column :firms, :postal_code, :string
  end
end
