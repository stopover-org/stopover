# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    event = Event.find args[0][:event_id]

    Schedule.where(event_id: event.id)
            .where('schedules.scheduled_for > ?', Time.zone.now)
            .where.not(id: Schedule.joins(:bookings))
            .destroy_all

    Stopover::EventSupport.schedule(event)
  end
end
