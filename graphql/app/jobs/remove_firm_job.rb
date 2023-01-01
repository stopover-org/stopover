# frozen_string_literal: true

class RemoveFirmJob < ApplicationJob
  queue_as :default

  def perform(firm_id)
    firm = Firm.find(firm_id)
    firm.events.each do |event|
      event.soft_delete!
      Schedule.where(event_id: event.id).left_outer_joins(:bookings).each do |schedule|
        schedule.destroy
      end
    end
  end
end
