class ImproveStatusesForAttendeesAttendeeOptionsBookingOptions < ActiveRecord::Migration[7.0]
  def change
    remove_column :attendees, :is_registered
    add_column :attendees, :status, :string, default: :not_registered
    add_column :attendee_options, :status, :string, default: :available
    add_column :booking_options, :status, :string, default: :available
    add_column :event_options, :status, :string, default: :available
  end
end
