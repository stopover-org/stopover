# frozen_string_literal: true

module Mutations
  class CancelTrip < BaseMutation
    field :trip, Types::TripType

    argument :trip_id, ID, loads: Types::TripType
    def resolve(trip:, **_args)
      trip.cancel!
      { trip: trip }
    end
  end
end
