# frozen_string_literal: true

class CreatePaymentConnection < ActiveRecord::Migration[7.0]
  def change
    create_table :payment_connections do |t|
      t.belongs_to :stripe_integration
      t.belongs_to :payment
      t.timestamps
    end
  end
end
