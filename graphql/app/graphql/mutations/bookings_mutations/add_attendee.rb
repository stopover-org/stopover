# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class AddAttendee < BaseMutation
      authorized_only
      authorize ->(booking:) { 'You don\'t have permissions' if booking.user != current_user && current_firm != booking.firm }

      field :booking, Types::BookingType

      argument :booking_id, ID, loads: Types::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingUpdater.new(booking, current_user).add_attendee
        }
      end
    end
  end
end
