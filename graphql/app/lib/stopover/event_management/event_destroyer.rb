# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventDestroyer
      def initialize(event, current_user)
        @event = event
        @current_user = current_user
      end

      def perform
        @event.remove!

        RemoveEventJob.perform_later(event_id: @event.id)

        @event
      end
    end
  end
end
