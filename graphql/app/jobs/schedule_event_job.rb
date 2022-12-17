# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    event = Event.find args[0][:event_id]
    return unless event.is_a? Event

    ::Configuration.get_value('SCHEDULE_DAYS_IN_ADVANCE').value.to_i.times do |i|
      date = Time.zone.today + i.days
      next unless event.check_date(date)

      times = event.get_time(date)
      times.each do |time|
        time = time.split(':')
        new_date = date.change({ hour: time[0].to_i, min: time[1].to_i })
        next if event.schedules.where(scheduled_for: new_date).any?
        event.schedules.create!(scheduled_for: new_date)
      end
    end
  end
end
