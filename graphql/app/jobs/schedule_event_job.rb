# frozen_string_literal: true

class ScheduleEventJob < ApplicationJob
  queue_as :default

  def perform(*args)
    return if Rails.env.test? && !args[0][:force]
    return if ::Configuration.get_value('ENABLE_STRIPE_INTEGRATION').value == 'true'

    event = Event.find args[0][:event_id]

    Stopover::EventSupport.schedule(event)
  end
end
