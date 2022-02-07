# frozen_string_literal: true

class CreateBookingEventOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :booking_event_options do |t|
      t.belongs_to :booking, foreign_key: true, index: true
      t.belongs_to :event_option, foreign_key: true, index: true

      t.timestamps
    end
  end
end
