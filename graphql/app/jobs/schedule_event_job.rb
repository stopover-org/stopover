# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    event = Event.find args[0][:event_id]

    Stopover::EventSupport.schedule(event)
  end
end
