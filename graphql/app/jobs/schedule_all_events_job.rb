# frozen_string_literal: true

class ScheduleAllEventsJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    Event.all.each do |event|
      ScheduleEventJob.perform_later(event_id: event.id)
    end
  end
end
