# frozen_string_literal: true

module Mutations
  class ChangeBookingOptionAvailability < BaseMutation
    field :booking_option, Types::BookingOptionType

    argument :booking_option_id, ID, loads: Types::BookingOptionType

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
