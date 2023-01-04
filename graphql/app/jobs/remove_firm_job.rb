# frozen_string_literal: true

class RemoveFirmJob < ApplicationJob
  queue_as :default

  def perform(firm_id)
    firm = Firm.find(firm_id)
    firm.events.each do |event|
      event.soft_delete!
      Schedule.where(event_id: event.id).left_outer_joins(:bookings).each do |schedule|
        schedule.destroy if schedule.scheduled_for.to_datetime > Time.zone.now
      end
    end
  end
end
