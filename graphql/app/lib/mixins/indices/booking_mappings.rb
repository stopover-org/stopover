# frozen_string_literal: true

module Mixins
  module Indices
    module BookingMappings
      extend ActiveSupport::Concern

      included do
        def search_data
          {
            title: event.title,
            booked_for: schedule.scheduled_for,
            contact_email: account.primary_email,
            contact_phone: account.primary_phone,
            trip_id: trip.id,
            event_id: event.id,
            schedule_id: schedule.id,
            firm_id: firm.id
          }
        end

        def self.searchkick_mappings
          {
            properties: {
              title: { type: 'text' },
              booked_for: { type: 'date' },
              contact_email: { type: 'keyword' },
              contact_phone: { type: 'keyword' },
              trip_id: { type: 'integer' },
              event_id: { type: 'integer' },
              schedule_id: { type: 'integer' },
              firm_id: { type: 'integer' }
            }
          }
        end
      end
    end
  end
end
