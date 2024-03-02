# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class AddAttendee < BaseMutation
      include Mutations::Authorizations::ManagerOrOwnerAuthorized
      include Mutations::BookingsRelated::Authorizations::BookingAuthorized
      include Mutations::EventsRelated::Authorizations::PlacesAuthorized

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

      def authorization_field(inputs)
        inputs[:booking]
      end
    end
  end
end
