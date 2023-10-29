# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class RemoveAttendee < BaseMutation
      field :attendee, Types::BookingsRelated::AttendeeType
      field :booking,  Types::BookingsRelated::BookingType

      argument :attendee_id, ID, loads: Types::BookingsRelated::AttendeeType
      def resolve(attendee:, **_args)
        Stopover::AttendeeManagement::RemoveAttendeeService.new(attendee, current_user).perform

        {
          attendee: attendee.reload,
          booking: attendee.booking,
          notification: I18n.t('graphql.mutations.remove_attendee.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          attendee: nil,
          booking: nil
        }
      end

      private

      def authorized?(**inputs)
        attendee = inputs[:attendee]

        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } if !owner?(attendee) && !manager?(attendee)
        return false, { errors: [I18n.t('graphql.errors.attendee_removed')] } if attendee.removed?
        return false, { errors: [I18n.t('graphql.errors.event_past')] } if attendee.booking.past?
        return false, { errors: [I18n.t('graphql.errors.booking_cancelled')] } if attendee.booking.cancelled?
        super
      end
    end
  end
end
