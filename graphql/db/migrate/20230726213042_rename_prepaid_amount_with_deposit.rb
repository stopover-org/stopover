class RenamePrepaidAmountWithDeposit < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :prepaid_amount_cents, :deposit_amount_cents
    rename_column :events, :requires_prepaid, :requires_deposit
    remove_column :events, :prepaid_type, :string
  end
end
