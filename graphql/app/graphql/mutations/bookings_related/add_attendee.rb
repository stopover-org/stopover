# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class AddAttendee < BaseMutation
      field :booking, Types::BookingsRelated::BookingType

      argument :booking_id, ID, loads: Types::BookingsRelated::BookingType

      def resolve(booking:)
        {
          booking: Stopover::BookingManagement::BookingUpdater.new(booking, context[:current_user]).add_attendee
        }
      end
    end
  end
end
