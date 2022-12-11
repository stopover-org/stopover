class ChangeCostToPrice < ActiveRecord::Migration[7.0]
  def change
    rename_column :events, :attendee_cost_per_uom_cents, :attendee_price_per_uom_cents
    rename_column :events, :organizer_cost_per_uom_cents, :organizer_price_per_uom_cents
    rename_column :event_options, :attendee_cost_cents, :attendee_price_cents
    rename_column :event_options, :organizer_cost_cents, :organizer_price_cents
    rename_column :booking_options, :attendee_cost_cents, :attendee_price_cents
    rename_column :booking_options, :organizer_cost_cents, :organizer_price_cents
    rename_column :attendee_options, :attendee_cost_cents, :attendee_price_cents
    rename_column :attendee_options, :organizer_cost_cents, :organizer_price_cents
  end
end
