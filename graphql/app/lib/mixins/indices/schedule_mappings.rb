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
    end
  end
end
