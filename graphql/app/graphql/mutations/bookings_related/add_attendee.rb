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
          notification: I18n.t('graphql.mutations.add_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil
        }
      end

      def authorized?(**inputs)
        booking = inputs[:booking]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(booking) && !manager?(booking)
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if booking.cancelled?
        return false, { errors: [I18n.t('graphql.errors.booking_past')] } if booking.past?
        return false, { errors: [I18n.t('graphql.errors.all_places_reserved')] } if booking.event.max_attendees && Attendee.where(booking_id: booking.id)
                                                                                                                           .where.not(status: 'removed')
                                                                                                                           .count >= booking.event.max_attendees

        super
      end
    end
  end
end
