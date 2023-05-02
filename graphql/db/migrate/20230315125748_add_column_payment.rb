# frozen_string_literal: true

class AddColumnPayment < ActiveRecord::Migration[7.0]
  def change
    add_reference :payments, :booking, index: true
    add_column :payments, :stripe_checkout_session_id, :string
    add_column :payments, :provider, :string
  end
end
