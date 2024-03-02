# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class UpdateBooking < BaseMutation
      AUTHORIZATION_FIELD = 'booking'
      include Mutations::Authorizations::ManagerOrOwnerAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType
      argument :booked_for, Types::DateTimeType, required: false
      argument :event_option_ids, [ID],
               loads: Types::EventsRelated::EventOptionType,
               required: false

      field :booking, Types::BookingsRelated::BookingType

      def resolve(booking:, **args)
        Stopover::BookingManagement::BookingUpdater.new(booking, current_user).perform(**args)

        {
          booking: booking.reload,
          notification: I18n.t('graphql.mutations.update_booking.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          errors: [message]
        }
      end
    end
  end
end
