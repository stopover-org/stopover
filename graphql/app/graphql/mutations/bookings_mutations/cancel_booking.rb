# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class CancelBooking < BaseMutation
      authorized_only
      authorize lambda { |booking:, current_account:, current_firm:, **_args|
        booking = GraphqlSchema.object_from_id(booking)
        Mutations::BookingsMutations::CancelBooking.validate(booking, current_account, current_firm)
      }

      field :booking, Types::BookingRelated::BookingType
      field :trip, Types::TripRelated::TripType

      argument :booking_id, ID, loads: Types::BookingRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingCancellation.new(booking, current_account).perform,
          trip: booking.trip,
          notification: 'Booking was cancelled'
        }
      end

      def self.validate(booking, current_account, current_firm)
        return 'You don\'t have permissions'        if booking.account != current_account && current_firm != booking.firm
        return 'Cancellation waiting for approval'  if booking.refunds.pending.any?
        return 'Cancellation in progress'           if booking.refunds.processing.any?
        return 'Booking was refunded already'       if booking.refunds.successful.any?
        return 'Booking was cancelled'              if booking.cancelled?

        nil
      end
    end
  end
end
