# frozen_string_literal: true

class AiCoverJob < ApplicationJob
  queue_as :default

  def perform(query, event_id)
    event = Event.find(event_id)

    Stopover::AiCoverService.new(query).attach(event)
  end
end
