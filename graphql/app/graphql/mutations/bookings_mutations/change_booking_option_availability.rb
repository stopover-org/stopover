# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class ChangeBookingOptionAvailability < BaseMutation
      manager_only

      field :booking_option, Types::BookingRelated::BookingOptionType

      argument :booking_option_id, ID, loads: Types::BookingRelated::BookingOptionType

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