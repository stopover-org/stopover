# frozen_string_literal: true

module Subscriptions
  class BookingChanged < Subscriptions::BaseSubscription
    field :booking, Types::BookingsRelated::BookingType

    argument :booking_id, ID, loads: Types::BookingsRelated::BookingType
    def subscribe(booking:)
      # authorize, etc ...
      # Return the room in the initial response
      {
        booking: booking
      }
    end
  end
end
