# frozen_string_literal: true

class RemoveFirmJob < ApplicationJob
  queue_as :default

  def perform(firm_id)
    firm = Firm.find(firm_id)
    firm.events.published.each do |event|
      event.unpublish!
    end
  end
end
