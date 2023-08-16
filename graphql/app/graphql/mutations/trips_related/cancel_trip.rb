# frozen_string_literal: true

module Mutations
  module TripsRelated
    class CancelTrip < BaseMutation
      field :trip, Types::TripType

      argument :trip_id, ID, loads: Types::TripType
      def resolve(trip:, **_args)
        trip.cancel!
        { trip: trip }
      end
    end
  end
end
