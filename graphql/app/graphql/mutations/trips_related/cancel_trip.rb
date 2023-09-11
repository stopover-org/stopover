# frozen_string_literal: true

module Mutations
  module TripsRelated
    class CancelTrip < BaseMutation
      field :trip, Types::TripsRelated::TripType

      argument :trip_id, ID, loads: Types::TripsRelated::TripType
      def resolve(trip:, **_args)
        trip.cancel!

        { trip: trip, notification: 'Trip cancelled!' }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?

        {
          booking: nil,
          trip: booking.trip
        }
      end

      private

      def authorized?(**inputs)
        trip = inputs[:trip]
        return false, { errors: ['You are not authorized'] } if !current_user || current_user&.inactive?
        return false, { errors: ['You are not authorized'] } if !owner?(trip) && !manager?(trip)

        return false, { errors: ['Trip cannot be cancelled'] } unless trip.can_cancel
        super
      end
    end
  end
end
