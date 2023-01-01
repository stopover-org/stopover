# frozen_string_literal: true

class AddRelationBookingSchedual < ActiveRecord::Migration[7.0]
  def change
    add_reference :bookings, :schedule, index: true, foreign_key: true
  end
end
