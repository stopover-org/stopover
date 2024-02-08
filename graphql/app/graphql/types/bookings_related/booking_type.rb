# frozen_string_literal: true

module Types
  module BookingsRelated
    class BookingType < Types::ModelObject
      field :id, ID, null: false
      field :account, Types::UsersRelated::AccountType, null: false
      field :booked_for, Types::DateTimeType, null: false
      field :event, Types::EventsRelated::EventType, null: false
      field :booking_options, [Types::BookingsRelated::BookingOptionType], null: false
      field :event_options, [Types::EventsRelated::EventOptionType], null: false
      field :status, String, null: false
      field :payment_type, String, null: true
      field :schedule, Types::EventsRelated::ScheduleType, null: false
      field :attendee_total_price, Types::MoneyType, null: false
      field :organizer_total_price, Types::MoneyType, null: false, require_manager: true
      field :left_to_pay_price, Types::MoneyType, null: false
      field :left_to_pay_deposit_price, Types::MoneyType, null: false
      field :already_paid_price, Types::MoneyType, null: false
      field :possible_refund_amount, Types::MoneyType, null: false
      field :possible_penalty_amount, Types::MoneyType, null: false
      field :trip, Types::TripsRelated::TripType, null: false
      field :payments, Types::PaymentsRelated::PaymentType.connection_type, null: false, require_manager: true
      field :refunds, Types::PaymentsRelated::RefundType.connection_type, null: false, require_manager: true
      field :cancellation_terms, String, null: false
      field :contact_email, String
      field :contact_phone, String

      field :attendees, [Types::BookingsRelated::AttendeeType], null: false do
        argument :filters, Types::Filters::AttendeesFilter, required: false
      end

      def payments(**_args)
        arguments = {
          query_type: ::PaymentsQuery,
          per_page: 30,
          booking_id: object.id
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def refunds(**_args)
        arguments = {
          query_type: ::RefundsQuery,
          per_page: 30,
          booking_id: object.id,
          refund_id: nil
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def booked_for
        object.schedule.scheduled_for
      end

      def attendees(**args)
        ::AttendeesQuery.new(args[:filters]&.to_h || {}, object.attendees).all
      end

      def cancellation_terms
        Stopover::BookingManagement::CurrentCancellation.new(object, current_user).terms
      end

      def possible_refund_amount
        Stopover::RefundManagement::RefundCreator.new(object, current_user).calculate_refund
      end

      def possible_penalty_amount
        Stopover::RefundManagement::RefundCreator.new(object, current_user).calculate_penalty
      end

      def contact_email
        object.account.primary_email
      end

      def contact_phone
        object.account.primary_phone
      end
    end
  end
end
