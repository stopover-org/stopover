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

      def self.account_data(account)
        json = account.attributes
        json[:graphql_id] = GraphqlSchema.id_from_object(account)
        json[:user] = user_data(account.user)

        json.to_json
      end

      def self.firm_data(firm)
        json = firm.attributes
        json[:graphql_id] = GraphqlSchema.id_from_object(firm)
        json[:accounts] = firm.accounts.map { |account| account_data(account) }

        json.to_json
      end

      def self.event_data(event)
        json = event.attributes
        json[:graphql_id] = GraphqlSchema.id_from_object(event)
        json[:seo_metadatum] = event.seo_metadatum.attributes

        json.to_json
      end
    end
  end
end
