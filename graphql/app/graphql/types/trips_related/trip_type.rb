# frozen_string_literal: true

module Types
  module TripsRelated
    class TripType < Types::ModelObject
      field :bookings,    [Types::BookingsRelated::BookingType], null: false
      field :start_date,  Types::DateTimeType
      field :end_date,    Types::DateTimeType
      field :cities,      [String], null: false
      field :status,      String, null: false
      field :images,      [String], null: false
      field :can_cancel,  Boolean, null: false
      field :account,     Types::UsersRelated::AccountType, null: false
      field :attendees_count, Integer, null: false

      def images
        object.bookings.map do |booking|
          booking.event.images.map do |img|
            img&.url
          end
        end.flatten.uniq
      end

      def attendees_count
        return object.bookings.map { |b| b.attendees.where.not(status: :removed).count }.max || 0 if object.cancelled?
        object.bookings.where.not(status: :cancelled).map { |b| b.attendees.where.not(status: :removed).count }.max || 0
      end

      def bookings
        object.bookings.where.not(status: :cancelled)
      end
    end
  end
end
