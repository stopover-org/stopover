# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class ChangeBookingOptionAvailability < BaseMutation
      field :booking_option, Types::BookingsRelated::BookingOptionType

      argument :booking_option_id, ID, loads: Types::BookingsRelated::BookingOptionType

      def resolve(booking_option:, **_args)
        case booking_option.status
        when 'available'
          booking_option.disable!
        when 'not_available'
          booking_option.restore!
        end

        {
          booking_option: booking_option
        }
      end
    end
  end
end