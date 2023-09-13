# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class AddAttendee < BaseMutation
      field :booking, Types::BookingsRelated::BookingType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        Stopover::AttendeeManagement::AddAttendeeService.new(booking, current_user).perform
        {
          booking: booking.reload,
          notification: 'Attendee was added!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          e: [e.message],
            attendee: nil
        }
      end

      def authorized?(**inputs)
        booking = inputs[:booking]

        return false, { errors: ['You are not authorized'] } if !owner?(booking) && !manager?(booking)
        return false, { errors: ['Booking cancelled'] } if booking.cancelled?
        return false, { errors: ['Booking past'] } if booking.past?
        return false, { errors: ['All places are reserved'] } if booking.event.max_attendees && Attendee.where(booking_id: booking.id)
                                                                                                        .where.not(status: 'removed')
                                                                                                        .count >= booking.event.max_attendees

        super
      end
    end
  end
end
