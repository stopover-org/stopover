# frozen_string_literal: true

class RemoveFirmJob < ApplicationJob
  queue_as :default

  def perform(firm_id)
    firm = Firm.find(firm_id)
    firm.events.each do |event|
      event.remove!
      event.schedules
           .where('schedules.scheduled_for > ?', Time.zone.now)
           .where.not(id: Schedule.joins(:bookings))
           .destroy_all
    end
  end
end
