# frozen_string_literal: true

module Mutations
  class AddAttendee < BaseMutation
    field :booking, Types::BookingType

    argument :booking_id, ID, loads: Types::BookingType

    def resolve(booking:)
      {
        booking: Stopover::BookingManagement::BookingUpdater.new(booking, context[:current_user]).add_attendee
      }
    end
  end
end
