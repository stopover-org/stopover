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
    end
  end
end
