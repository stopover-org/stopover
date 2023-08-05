# frozen_string_literal: true

module Mutations
  module TripeMutations
    class CancelTrip < BaseMutation
      authorized_only
      authorize ->(trip:) { 'You don\'t have permission' if trip.account != current_account }

      field :trip, Types::TripType

      argument :trip_id, ID, loads: Types::TripType
      def resolve(trip:, **_args)
        trip.cancel!

        { trip: trip }
      end
    end
  end
end
