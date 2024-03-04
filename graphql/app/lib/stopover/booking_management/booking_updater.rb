# frozen_string_literal: true

module Stopover
  module BookingManagement
    class BookingUpdater
      def initialize(booking, current_user)
        @booking = booking
        @current_user = current_user
      end

      def perform(**args)
        if args[:booked_for]
          schedule = @booking.event.schedules.find_by(scheduled_for: args[:booked_for])
          @booking.update!(schedule: schedule, **args.except(:booked_for, :event_options))
        end

        if args[:event_options].is_a? Array
          @booking.booking_options.each do |option|
            option.destroy unless args[:event_options].include?(option.event_option)
          end

          args[:event_options].each do |option|
            option.booking_options.create!(booking: @booking, event_option: option) unless @booking.booking_options.map(&:event_option).include?(option)
          end
        end

        if @current_user != @booking.account.user && @booking.account.primary_email
          @booking.notifications.create!(
            delivery_method: 'email',
            to: @booking.account.primary_email,
            subject: "Your booking was changed #{@booking.event.title}",
            content: Stopover::MailProvider.prepare_content(file: 'mailer/trips/bookings/booking_updated',
                                                            locals: { booking: @booking })
          )
        end

        @booking.payments.processing.destroy_all

        GraphqlSchema.subscriptions.trigger(:booking_changed, { bookingId: @booking.id }, { booking: @booking.reload })
      end
    end
  end
end
