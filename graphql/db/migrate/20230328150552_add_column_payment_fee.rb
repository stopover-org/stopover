# frozen_string_literal: true

class AddColumnPaymentFee < ActiveRecord::Migration[7.0]
  def change
    add_column :payments, :fee_cents, :decimal, default: 0
    add_column :payments, :payment_type, :string
  end
end
