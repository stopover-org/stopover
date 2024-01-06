# frozen_string_literal: true

module Mixins
  module Indices
    extend ActiveSupport::Concern

    included do
      searchkick

      def self.reindex_test
        searchkick_index.delete
        searchkick_index.create
        reindex
      end
    end
  end
end
