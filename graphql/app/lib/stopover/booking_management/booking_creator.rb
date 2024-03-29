# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingCreator
      def initialize(user = nil)
        @user = user || User.create_temporary
        @account = @user.account || Account.create(user: @user)
        @current_trip_service = Stopover::CurrentTripService.new(user: @user)
      end

      def perform(event, booked_for, attendees_count = 1, **args)
        @account.update(primary_email: args[:email], primary_phone: args[:phone])

        @current_trip = @current_trip_service.get_current_trip(booked_for)
        bookings = event.bookings.where.not(status: :cancelled)
                        .includes(:schedule)
                        .where(schedule: { scheduled_for: booked_for, status: :active })
                        .joins(:trip)
                        .where(trip: { account: @account })

        return bookings.first if bookings.any?

        attendees = (1..attendees_count).map { Attendee.new }
        attendees[0].assign_attributes(first_name: @account.name,
                                       email: args[:email],
                                       phone: args[:phone])

        if args[:places]&.any?
          args[:places].each_with_index do |place, index|
            attendees[index].place = place
          end
        end

        @current_trip.update!(status: 'active') if @current_trip.cancelled?

        payment_type = event.firm.payment_types == ['cash'] ? 'cash' : nil

        event.bookings.create!(
          schedule: event.schedules.find_by(scheduled_for: booked_for),
          attendees: attendees,
          trip: @current_trip,
          payment_type: payment_type
        )
      end
    end
  end
end
