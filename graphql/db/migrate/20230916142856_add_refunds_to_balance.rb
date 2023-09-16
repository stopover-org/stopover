class AddRefundsToBalance < ActiveRecord::Migration[7.0]
  def change
    add_reference :refunds, :balance
  end
end
