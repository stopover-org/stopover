class AddCurrentFirmToAccount < ActiveRecord::Migration[7.0]
  def change
    add_reference :accounts, :firm
    Account.all.each do |account|
      account.update(firm: account.current_firm)
    end
  end
end
