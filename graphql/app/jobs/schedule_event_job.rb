# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    event = Event.find args[0][:event_id]

    event.schedules
         .where('schedules.scheduled_for > ?', Time.zone.now)
         .where.not(id: event.schedules.joins(:bookings))
         .destroy_all

    event.schedules
         .where('schedules.scheduled_for > ?', Time.zone.now)
         .update_all(status: :disabled)

    Stopover::EventSupport.schedule(event)
  end
end
