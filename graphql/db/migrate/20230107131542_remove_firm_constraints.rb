class RemoveFirmConstraints < ActiveRecord::Migration[7.0]
  def change
    change_column_null :firms, :primary_email, true
    change_column_null :firms, :primary_phone, true
  end
end
