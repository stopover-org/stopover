class AddPriceToBooking < ActiveRecord::Migration[7.0]
  def change
    add_column :bookings, :organizer_price_per_uom_cents, :decimal, default: 0
    add_column :bookings, :attendee_price_per_uom_cents, :decimal, default: 0

    Booking.all.each do |booking|
      booking.update_columns(
        organizer_price_per_uom_cents: booking.event.organizer_price_per_uom_cents,
        attendee_price_per_uom_cents: booking.event.attendee_price_per_uom_cents)
    end
  end
end
