# frozen_string_literal: true

class RemoveBookedFor < ActiveRecord::Migration[7.0]
  def change
    remove_column :bookings, :booked_for
  end
end
