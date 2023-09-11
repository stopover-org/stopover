# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class UpdateBooking < BaseMutation
      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType
      argument :booked_for, Types::DateTimeType, required: false
      argument :event_option_ids, [ID],
               loads: Types::EventsRelated::EventOptionType,
               required: false

      field :booking, Types::BookingsRelated::BookingType
      def resolve(booking:, **args)
        schedule = booking.event.schedules.find_by(scheduled_for: args[:booked_for])
        booking.update!(schedule: schedule, **args.except(:booked_for, :event_options))

        if args[:event_options].is_a? Array
          booking.booking_options.destroy_all
          args[:event_options].each do |option|
            booking.booking_options.create!(booking: booking, event_option: option)
          end
        end

        {
          booking: booking,
          notification: 'Booking was updated!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          errors: [e.message]
        }
      end

      def authorized?(**inputs)
        booking = inputs[:booking]

        return false, { errors: ['You are not authorized'] } if !owner?(booking) && !manager?(booking)
        return false, { errors: ['Booking paid already'] } if owner?(booking) && booking.payments.successful.any?

        return false, { errors: ['Event past'] } if booking.past?
        return false, { errors: ['Booking cancelled'] } if booking.cancelled?

        return false, { errors: ['Date past'] } if inputs[:booked_for].past?
        return false, { errors: ['Wrong option type'] } if inputs[:event_options]&.select { |opt| opt.for_attendee }&.any?

        super
      end
    end
  end
end
