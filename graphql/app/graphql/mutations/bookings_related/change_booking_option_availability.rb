# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class ChangeBookingOptionAvailability < BaseMutation
      AUTHORIZATION_FIELD = 'booking_option'
      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized

      field :booking_option, Types::BookingsRelated::BookingOptionType

      argument :booking_option_id, ID, loads: Types::BookingsRelated::BookingOptionType

      def resolve(booking_option:, **_args)
        booking = booking_option.booking

        case booking_option.status
        when 'available'
          booking_option.disable!
          message = I18n.t('graphql.mutations.change_booking_option_availability.notifications.unavailable')
        when 'not_available'
          booking_option.restore!
          message = I18n.t('graphql.mutations.change_booking_option_availability.notifications.available')
        end

        BookingManagement::PriceResetJob.perform_later(booking.id)

        {
          booking_option: booking_option,
          notification: message
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          errors: [message],
          booking_option: nil
        }
      end
    end
  end
end
