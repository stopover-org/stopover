# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventPublisher
      def initialize(event, current_user)
        @event = event
        @current_user = current_user
      end

      def publish
        @event.publish!

        ScheduleEventJob.perform_later(event_id: @event.id)

        StripeIntegratorSyncJob.perform_later('event', @event.id)

        @event
      end

      def unpublish
        @event.unpublish!

        ClearSchedulesJob.perform_later(event_id: @event.id)

        @event
      end
    end
  end
end
