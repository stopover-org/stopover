# frozen_string_literal: true

class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.string :name
      t.string :status
      t.string :phone
      t.string :email
      t.datetime :booked_for, null: false
      t.belongs_to :event

      t.timestamps
    end

    add_column :event_options, :description, :text
  end
end
