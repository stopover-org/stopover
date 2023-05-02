# frozen_string_literal: true

class AddBookingCancellationOption < ActiveRecord::Migration[7.0]
  def change
    create_table :booking_cancellation_options do |t|
      t.integer :penalty_price_cents
      t.timestamp :deadline
      t.text :description, default: ''
      t.string :status

      t.belongs_to :event

      t.timestamps
    end
  end
end
