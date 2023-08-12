class ImproveRefundMode < ActiveRecord::Migration[7.0]
  def change
    rename_column :refunds, :author, :author_type
    add_reference :refunds, :account
  end
end
