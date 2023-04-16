# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    event = Event.find args[0][:event_id]
    return unless event.is_a? Event

    Stopover::EventSupport.schedule(event)
  end
end
