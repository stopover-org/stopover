# frozen_string_literal: true

module Types
  class ScheduleType < Types::ModelObject
    field :id, ID, null: false
    field :scheduled_for, Types::DateTimeType, null: false
    field :status, String, null: false
    field :event, Types::EventType, null: false
  end
end
