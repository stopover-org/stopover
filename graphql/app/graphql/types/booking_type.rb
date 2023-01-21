# frozen_string_literal: true

module Types
  class BookingType < Types::ModelObject
    field :id, ID, null: false
    field :booked_for, Types::DateTimeType, null: false
    field :event, Types::EventType, null: false
    field :event_options, [Types::EventOptionType]
    field :status, String
    field :attendees, [Types::AttendeeType]

    def booked_for
      object.schedule.scheduled_for
    end
  end
end
