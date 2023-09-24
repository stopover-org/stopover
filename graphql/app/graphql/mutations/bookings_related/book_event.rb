# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class BookEvent < BaseMutation
      argument :event_id, ID, loads: Types::EventsRelated::EventType
      argument :booked_for, Types::DateTimeType
      argument :attendees_count, Integer

      field :booking, Types::BookingsRelated::BookingType
      field :access_token, String

      def resolve(event:, **args)
        service = Stopover::BookingManagement::BookingCreator.new(context[:current_user])
        booking = service.perform(event, args[:booked_for], args[:attendees_count])
        context[:current_user] = booking.account.user
        {
          booking: booking,
          access_token: booking.user.access_token,
          notification: 'You booked this event!'
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          access_token: nil,
          errors: [e.message]
        }
      end

      private

      def authorized?(**inputs)
        schedules = inputs[:event].schedules.active.where(scheduled_for: inputs[:booked_for])

        return false, { errors: ['Event past'] } if inputs[:booked_for].past?
        return false, { errors: ['Something went wrong'] } if schedules.empty?
        return false, { errors: ['You already booked this event'] } if current_account && current_account.bookings.where(schedule_id: schedules.ids).any?
        return false, { errors: ['All places are already reserved'] } if inputs[:event].max_attendees && Attendee.where(booking_id: schedules.first.booking_ids).count >= inputs[:event].max_attendees

        super
      end
    end
  end
end
