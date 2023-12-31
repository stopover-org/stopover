# frozen_string_literal: true

module Types
  module EventsRelated
    class ScheduleType < Types::ModelObject
      field :id,            ID, null: false
      field :scheduled_for, Types::DateTimeType, null: false
      field :status,        String, null: false
      field :event,         Types::EventsRelated::EventType, null: false
      field :bookings,      Types::BookingsRelated::BookingType.connection_type, null: false, require_manager: true do
        argument :filters, Types::Filters::BookingsFilter, required: false
      end
      field :left_places,   Integer
      field :booked_places, Integer

      def booked_places
        object.attendees.where.not(status: :removed).count
      end

      def left_places
        return unless object.event.max_attendees

        left = object.event.max_attendees - object.attendees.where.not(status: :removed).count

        return left if left.positive?

        0
      end

      def bookings(**args)
        arguments = {
          query_type: ::BookingQuery,
          **(args[:filters] || {}),
          schedule_id: object.id
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end
    end
  end
end
