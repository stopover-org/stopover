# frozen_string_literal: true

class RemoveAttendeeJob < ApplicationJob
  queue_as :default

  def perform(attendee_id)
    attendee = Attendee.find(attendee_id)
    attendee.attendee_options.each do |attendee_option|
      attendee_option.destroy!
    end
  end
end
