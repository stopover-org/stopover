# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class BookEvent < BaseMutation
      AUTHORIZATION_FIELD = 'event'
      include Mutations::EventsRelated::Authorizations::ActiveEventAuthorized
      include Mutations::FirmsRelated::Authorizations::ActiveFirmAuthorized
      include Mutations::BookingsRelated::Authorizations::PotentialBookingAuthorized

      argument :event_id, ID, loads: Types::EventsRelated::EventType
      argument :booked_for, Types::DateTimeType
      argument :attendees_count, Integer, required: false
      argument :places, [[Integer]], required: false

      argument :email, String, required: false
      argument :phone, String, required: false

      field :booking, Types::BookingsRelated::BookingType
      field :access_token, String

      def resolve(event:, **args)
        service = Stopover::BookingManagement::BookingCreator.new(context[:current_user])
        booking = if event.event_placements.count.zero?
                    service.perform(event, args[:booked_for], args[:attendees_count], **args)
                  else
                    service.perform(event, args[:booked_for], args[:attendees_count], places: args[:places])
                  end

        {
          booking: booking,
          access_token: booking.user.access_token,
          notification: I18n.t('graphql.mutations.book_event.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          access_token: nil,
          errors: [message]
        }
      end
    end
  end
end
