# frozen_string_literal: true

module Mutations
  module BookingsMutations
    class UpdateBooking < BaseMutation
      authorized_only
      authorize ->(booking:) { 'You don\'t have permissions' if booking.user != current_user && current_firm != booking.firm }

      argument :booking_id, ID, loads: Types::BookingRelated::BookingType
      argument :status, String, required: false
      argument :booked_for, Types::DateTimeType, required: false
      argument :event_option_ids, [ID],
               loads: Types::EventRelated::EventOptionType,
               required: false

      field :booking, Types::BookingRelated::BookingType
      def resolve(booking:, **args)
        schedule = booking.event.schedules.find_by(scheduled_for: args[:booked_for])
        booking.update!(schedule: schedule, **args.except(:booked_for, :event_options))

        if args[:event_options].is_a? Array
          booking.booking_options.destroy_all
          args[:event_options].each do |option|
            booking.booking_options.create!(booking: booking, event_option: option)
          end
        end

        {
          booking: booking
        }
      end
    end
  end
end
