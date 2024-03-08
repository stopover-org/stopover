# frozen_string_literal: true

module Mixins
  module Indices
    module ScheduleMappings
      extend ActiveSupport::Concern

      def search_data
        {
          scheduled_for: scheduled_for,
          status: status,
          event_id: event.id,
          firm_id: event.firm.id
        }
      end

      included do
        def self.searchkick_mappings
          {
            properties: {
              scheduled_for: { type: 'date' }, # Assuming scheduled_for is a date field
              status: { type: 'keyword' }, # Assuming status is a keyword field
              event_id: { type: 'integer' }, # Assuming event_id is an integer field
              firm_id: { type: 'integer' } # Assuming firm_id is an integer field
            }
          }
        end
      end
    end
  end
end
