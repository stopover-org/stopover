# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingUpdater
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform(**args)
        schedule = @booking.event.schedules.find_by(scheduled_for: args[:booked_for])
        @booking.update!(schedule: schedule, **args.except(:booked_for, :event_options))

        if args[:event_options].is_a? Array
          @booking.booking_options.destroy_all
          args[:event_options].each do |option|
            @booking.booking_options.create!(booking: @booking, event_option: option)
          end
        end
      end
    end
  end
end
