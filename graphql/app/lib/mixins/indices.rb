# frozen_string_literal: true

module Mixins
  module Indices
    extend ActiveSupport::Concern

    included do
      def self.reindex_test
        searchkick_index.delete
        searchkick_index.create
        reindex
      end

      def self.searchkick_settings
        {
          index: {
            number_of_shards: 1,
            number_of_replicas: Rails.env.test? ? 0 : 1
          }
        }
      end

      searchkick callbacks: !Rails.env.test?,
                 settings: searchkick_settings
    end
  end
end
