# frozen_string_literal: true

module Stopover
  module EventManagement
    class EventRescheduler
      def initialize(event, current_user)
        @event = event
        @current_user = current_user
      end

      def perform
        Schedule.where(event_id: @event.id)
                .where('schedules.scheduled_for > ?', Time.zone.now)
                .where.not(id: Schedule.joins(:bookings))
                .destroy_all

        ScheduleEventJob.perform_later(event_id: @event.id)

        @event
      end
    end
  end
end
