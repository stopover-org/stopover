# frozen_string_literal: true

module Stopover
  module Testing
    class E2eHelper
      def self.user_data(user)
        json = user.attributes
        json[:access_token] = user.access_token

        json[:graphql_id] = GraphqlSchema.id_from_object(user)

        json.to_json
      end

      def self.trip_data(trip)
        { **trip.attributes,
          graphql_id: GraphqlSchema.id_from_object(trip),
          bookings: trip.bookings.map { |booking| booking_data(booking) } }
      end
    end
  end
end
