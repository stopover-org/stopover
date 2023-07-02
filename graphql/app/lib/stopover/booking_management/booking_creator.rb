# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingCreator
      def initialize(user = nil)
        @user = user || User.create!(status: :temporary)
        @account = @user.account || Account.create!(user: @user)
        @current_trip_service = Stopover::CurrentTripService.new(user: @user)
      end

      def perform(event, booked_for, attendees_count = 1)
        @current_trip = @current_trip_service.get_current_trip(booked_for)
        bookings = event.bookings.includes(:schedule)
                        .where(schedule: { scheduled_for: booked_for, status: :active })
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
end
