# frozen_string_literal: true

module Types
  module TripsRelated
    class TripType < Types::ModelObject
      field :bookings,    [Types::BookingsRelated::BookingType], null: false
      field :start_date,  Types::DateTimeType, null: false
      field :end_date,    Types::DateTimeType, null: false
      field :cities,      [String], null: false
      field :status,      String, null: false
      field :images,      [String], null: false
      field :can_cancel,  Boolean, null: false
      field :account,     Types::UsersRelated::AccountType, null: false
      field :attendees_count, Integer, null: false

      def images
        object.bookings.map do |booking|
          booking.event.images.map do |img|
            Rails.application.routes.url_helpers.rails_blob_url(img)
          end
        end.flatten.uniq
      end

      def attendees_count
        object.bookings.map { |b| b.attendees.count }.max
      end
    end
  end
end
