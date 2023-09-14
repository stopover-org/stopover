# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class ChangeBookingOptionAvailability < BaseMutation
      field :booking_option, Types::BookingsRelated::BookingOptionType

      argument :booking_option_id, ID, loads: Types::BookingsRelated::BookingOptionType

      def resolve(booking_option:, **_args)
        booking = booking_option.booking

        case booking_option.status
        when 'available'
          booking_option.disable!
          message = 'Booking Option is unavailable from now'
        when 'not_available'
          booking_option.restore!
          message = 'Booking Option is available from now'
        end

        BookingManagement::PriceResetJob.perform_later(booking.id)

        {
          booking_option: booking_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          e: [e.message],
          booking_option: nil
        }
      end

      private

      def authorized?(**inputs)
        booking_option = inputs[:booking_option]
        return false, { errors: ['You are not authorized'] } unless manager?(booking_option)

        return false, { errors: ['Event past'] } if booking_option.booking.past?
        return false, { errors: ['Booking was cancelled'] } if booking_option.booking.cancelled?
        super
      end
    end
  end
end
