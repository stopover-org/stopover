# frozen_string_literal: true

module Types
  module BookingRelated
    class BookingType < Types::ModelObject
      field :id, ID, null: false
      field :booked_for, Types::DateTimeType, null: false
      field :event, Types::EventRelated::EventType, null: false
      field :booking_options, [Types::BookingRelated::BookingOptionType], null: false
      field :event_options, [Types::EventRelated::EventOptionType], null: false
      field :status, String, null: false
      field :schedule, Types::EventRelated::ScheduleType, null: false
      field :attendee_total_price, Types::MoneyType, null: false
      field :organizer_total_price, Types::MoneyType, null: false, require_manager: true
      field :left_to_pay_price, Types::MoneyType, null: false
      field :already_paid_price, Types::MoneyType, null: false
      field :trip, Types::TripRelated::TripType, null: false
      field :payments, [Types::PaymentRelated::PaymentType], null: false, require_manager: true
      field :attendees, [Types::BookingRelated::AttendeeType], null: false do
        argument :filters, Types::Filters::AttendeesFilter, required: false
      end
      field :refunds, [Types::PaymentRelated::RefundType], null: false

      def booked_for
        object.schedule.scheduled_for
      end

      def attendees(**args)
        ::AttendeesQuery.new(args[:filters]&.to_h || {}, object.attendees).all
      end
    end
  end
end
