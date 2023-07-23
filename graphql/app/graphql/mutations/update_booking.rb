# frozen_string_literal: true

module Mutations
  class UpdateBooking < BaseMutation
    argument :booking_id, ID, loads: Types::BookingType
    argument :status, String, required: false
    argument :booked_for, Types::DateTimeType, required: false
    argument :event_option_ids, [ID],
             loads: Types::EventOptionType,
             required: false

    field :booking, Types::BookingType
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
        booking: booking
      }
    rescue StandardError => e
      Sentry.capture_exception(e) if Rails.env.production?

      return handle_error_in_development(e) if Rails.env.development?
      {
        booking: nil,
        error: e.message
      }
    end
  end
end
