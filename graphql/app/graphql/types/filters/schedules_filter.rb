# frozen_string_literal: true

module Types
  module Filters
    class SchedulesFilter < BaseInputObject
      argument :start_date, DateTimeType, required: false
      argument :end_date, DateTimeType, required: false
      argument :event_ids, [ID], loads: Types::EventsRelated::EventType, required: false
      argument :firm_id, ID, loads: Types::FirmsRelated::FirmType, required: false
    end
  end
end
