class AddMarginToFirm < ActiveRecord::Migration[7.0]
  def change
    add_column :firms, :margin, :integer, default: 0
  end
end
