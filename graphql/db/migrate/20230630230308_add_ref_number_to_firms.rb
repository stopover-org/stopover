class AddRefNumberToFirms < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :ref_number, :string
  end
end
