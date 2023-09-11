# frozen_string_literal: true

class ClearSchedulesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    event = Event.find args[0][:event_id]

    event.schedules
         .where('schedules.scheduled_for > ?', Time.zone.now)
         .where.not(id: Schedule.joins(:bookings))
         .destroy_all

    event.bookings.active.each do |booking|
      booking.schedule.disable!
    end
  end
end
