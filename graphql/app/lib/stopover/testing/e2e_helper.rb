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
          bookings: trip.bookings.map { |booking| booking_data(booking)}
        }
      end

      def self.fixture_files
        fixtures_dir = File.join(Rails.root, '/test/fixtures')
        fixture_tables = %w[
          firms
          users
          accounts
          account_firms
        ]

        files = Dir.glob(File.join(fixtures_dir, '*.yml'))

        fixture_tables.select { |filename| files.include?("#{fixtures_dir}/#{filename}.yml") }
      end
    end
  end
end
