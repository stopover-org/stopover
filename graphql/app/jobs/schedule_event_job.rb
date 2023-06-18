# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    return if ::Configuration.get_value('SCHEDULE_DAYS_IN_ADVANCE').value == 'true'

    event = Event.find args[0][:event_id]

    Stopover::EventSupport.schedule(event)
  end
end
