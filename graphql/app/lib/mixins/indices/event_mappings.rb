# frozen_string_literal: true

module Mixins
  module Indices
    module EventMappings
      extend ActiveSupport::Concern

      def search_data
        {
          title: [title, *dynamic_translations.where(source_field: 'title').map(&:translation)],
          source_title: title,
          country: address&.country,
          city: address&.city,
          dates: schedules.map(&:scheduled_for).map(&:to_time),
          organizer: firm&.title,
          interests: interests.map(&:slug),
          price: attendee_price_per_uom_cents,
          status: status,
          firm_id: firm.id,
          featured: featured,
          onboarding: firm.firm_type_onboarding?
        }
      end

      included do
        def self.searchkick_mappings
          {
            properties: {
              title: { type: 'text', index: false },
              source_title: { type: 'text' },
              country: { type: 'text' },
              city: { type: 'text' },
              dates: { type: 'date' },
              organizer: { type: 'text' },
              interests: { type: 'keyword' },
              price: { type: 'integer' },
              status: { type: 'keyword' },
              firm_id: { type: 'integer' },
              featured: { type: 'boolean' },
              onboarding: { type: 'boolean' }
            }
          }
        end
      end
    end
  end
end
