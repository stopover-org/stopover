# frozen_string_literal: true

module Types
  module EventsRelated
    class ScheduleType < Types::ModelObject
      field :id,            ID, null: false
      field :scheduled_for, Types::DateTimeType, null: false
      field :status,        String, null: false
      field :event,         Types::EventsRelated::EventType, null: false
      field :bookings,      [Types::BookingsRelated::BookingType], null: false, require_manager: true
      field :left_places,   Integer

      def left_places
        return unless object.event.max_attendees

        left = object.event.max_attendees - object.attendees.where.not(status: :removed).count

        return left if left.positive?

        0
      end
    end
  end
end
