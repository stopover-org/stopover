module Stopover
  class CurrentTripService
    def initialize(user:)
      @user = user
      @trips = user.account.trips
    end

    def get_current_trip(booking)
      config_value = Configuration.get_value(<your-key>).value
      existing_trips = @trips.joins(bookings: :schedule).where("bookings.schedules.scheduled_for BETWEEN ? AND ?",
                                                               booking.schedule.scheduled_for + config_value.days,
                                                               booking.schedule.scheduled_for - config_value.days)
                             .order(updated_at: :asc)

      if existing_trips
        return existing_trips.last
      else

      end
      @user.account.trips.each do |trip|

        #if trip.is_in_window_range(booking)
        # trip.add(booking)
        #end
      end
      booking.trip.start_date
      booking.trip.end_date
    end
  end
end