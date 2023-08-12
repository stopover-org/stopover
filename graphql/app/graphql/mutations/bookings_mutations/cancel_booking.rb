# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class CancelBooking < BaseMutation
      authorized_only
      authorize ->(booking:) { 'You don\'t have permissions' if booking.user != current_user && current_firm != booking.firm }

      field :booking, Types::BookingRelated::BookingType
      field :trip, Types::TripRelated::TripType

      argument :booking_id, ID, loads: Types::BookingRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingCancellation.new(booking, current_user).perform,
          trip: booking.trip
        }
      end
    end
  end
end
