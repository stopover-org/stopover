# frozen_string_literal: true

module Mixins
  module Indices
    module BookingMappings
      extend ActiveSupport::Concern

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
    end
  end
end
