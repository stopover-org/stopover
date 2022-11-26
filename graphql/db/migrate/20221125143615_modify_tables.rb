class ModifyTables < ActiveRecord::Migration[7.0]
  def change
    add_column :booking_options, :attendee_cost_cents, :decimal, default: 0
    add_column :booking_options, :organizer_cost_cents, :decimal, default: 0
    add_column :attendee_options, :attendee_cost_cents, :decimal, default: 0
    add_column :attendee_options, :organizer_cost_cents, :decimal, default: 0
  end
end
