# frozen_string_literal: true

module Stopover
  class BookingService
    def initialize(user = nil)
      @user = user || User.create!(status: :temporary)
      @account = @user.account
      @current_trip_service = Stopover::CurrentTripService.new(user: @user)
    end

    def book_event(event, booked_for, attendees_count = 1)
      @account ||= Account.create!(user: @user)
      @current_trip = @current_trip_service.get_current_trip(booked_for)
      bookings = event.bookings.includes(:schedule)
                      .where(schedule: { scheduled_for: booked_for })
                      .joins(:trip)
                      .where(trip: { account: @account })

      return bookings.first if bookings.any?

      event.bookings.create!(
        schedule: event.schedules.find_by(scheduled_for: booked_for),
        attendees: (1..attendees_count).map { Attendee.new },
        trip: @current_trip
      )
    end
  end
end
