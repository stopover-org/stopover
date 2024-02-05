# frozen_string_literal: true

module Types
  module Filters
    class SchedulesFilter < BaseInputObject
      argument :scheduled_for, Types::DateTimeType, required: false
      argument :event_ids, [ID], loads: Types::EventsRelated::EventType, required: false
    end
  end
end
