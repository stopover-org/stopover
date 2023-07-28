# frozen_string_literal: true

class RemoveEventJob < ApplicationJob
  queue_as :default
  def perform(event_id:)
    event = Event.find(event_id)
    event.soft_delete!
    Schedule.where(event_id: event.id)
            .where('schedules.scheduled_for > ?', Time.zone.now)
            .where.not(id: Schedule.joins(:bookings))
            .destroy_all
  rescue StandardError => e
    Sentry.capture_exception(e) if Rails.env.production?
  end
end
