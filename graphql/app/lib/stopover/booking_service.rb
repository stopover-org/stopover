# frozen_string_literal: true

module Stopover
  class BookingService
    def initialize(user = nil)
      @user = user || User.create!(status: :temporary)
      @account = @user.account
      @current_trip = @account&.current_trip
    end

    def book_event(event, booked_for, attendees_count = 1)
      @account ||= Account.create!(user: @user)
      @current_trip ||= Trip.create!(account: @account)
      bookings = event.bookings.includes(:schedule).where(schedule: { scheduled_for: booked_for })
      return booking.first if bookings.any?
      event.bookings.create!(
        schedule: event.schedules.find_by(scheduled_for: booked_for),
        attendees: (1..attendees_count).map { Attendee.new },
        trip: @current_trip
      )
    end
  end
end
