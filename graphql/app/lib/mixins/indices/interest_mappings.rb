# frozen_string_literal: true

module Mixins
  module Indices
    module InterestMappings
      extend ActiveSupport::Concern

      def search_data
        {
          title: [title, *dynamic_translations.where(source_field: 'title').map(&:translation)]
        }
      end

      included do
        def self.searchkick_mappings
          {
            properties: {
              title: {
                type: 'text',
                index: false
              }
            }
          }
        end
      end
    end
  end
end
