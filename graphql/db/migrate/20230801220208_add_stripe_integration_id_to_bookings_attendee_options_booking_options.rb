class AddStripeIntegrationIdToBookingsAttendeeOptionsBookingOptions < ActiveRecord::Migration[7.0]
  def change
    add_reference :bookings, :stripe_integration, foreign_key: true
    add_reference :attendee_options, :stripe_integration, foreign_key: true
    add_reference :booking_options, :stripe_integration, foreign_key: true
  end
end
