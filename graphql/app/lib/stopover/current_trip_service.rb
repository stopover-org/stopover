# frozen_string_literal: true

module Stopover
  class CurrentTripService
    def initialize(user:)
      @user = user
      @trips = user.account.trips
    end

    def get_current_trip(booked_for)
      config_value = Configuration.get_value('GET_TRIP_WINDOW').value.to_i

      existing_trips = @trips.joins(:bookings)
                             .where(bookings: Booking.joins(:schedule)
                                                     .where('schedules.scheduled_for BETWEEN ? AND ?',
                                                            booked_for - config_value.days,
                                                            booked_for + config_value.days)).distinct
                             .order(updated_at: :asc)

      return existing_trips.last if existing_trips.count.positive?
      Trip.create!(account: @user.account, status: 'draft')
    end
  end
end
