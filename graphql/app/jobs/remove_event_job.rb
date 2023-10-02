# frozen_string_literal: true

class RemoveEventJob < ApplicationJob
  queue_as :default
  def perform(event_id:)
    event = Event.find(event_id)
    event.remove! unless event.removed?
    Schedule.where(event_id: event.id)
            .where('schedules.scheduled_for > ?', Time.current)
            .where.not(id: event.schedules.joins(:bookings))
            .destroy_all
  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
  end
end
