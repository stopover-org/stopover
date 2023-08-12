# frozen_string_literal: true

module Mutations
  module TripsMutations
    class CancelTrip < BaseMutation
      authorized_only
      authorize lambda { |**args|
        'You don\'t have permission' if args[:trip]&.account != args[:current_account]
      }

      field :trip, Types::TripRelated::TripType

      argument :trip_id, ID, loads: Types::TripRelated::TripType
      def resolve(trip:, **_args)
        trip.cancel!

        { trip: trip }
      end
    end
  end
end
