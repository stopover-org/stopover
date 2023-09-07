# frozen_string_literal: true

module Stopover
  class CurrentTripService
    TRIP_WINDOW = 14

    def initialize(user:)
      @user = user
      @trips = user.account.trips.where(status: %i[active draft])
    end

    def get_current_trip(booked_for)
      config_value = Stopover::CurrentTripService::TRIP_WINDOW

      existing_trips = @trips.joins(:bookings)
                             .where(bookings: Booking.joins(:schedule)
                                                     .where('schedules.scheduled_for BETWEEN ? AND ?',
                                                            booked_for - config_value.days,
                                                            booked_for + config_value.days)
                                                     .where(schedules: { status: :active }))
                             .distinct
                             .order(updated_at: :asc)

      return existing_trips.last if existing_trips.count.positive?
      Trip.create!(account: @user.account, status: 'draft')
    end
  end
end
