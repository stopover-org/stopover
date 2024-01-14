# frozen_string_literal: true

module Types
  module FirmsRelated
    class FirmType < Types::ModelObject
      field :id, ID, null: false
      field :contact_person, String
      field :contacts, String
      field :description, String
      field :primary_email, String, null: false
      field :primary_phone, String
      field :status, String
      field :title, String, null: false
      field :website, String
      field :image, String
      field :payment_types, [String], null: false
      field :addresses, [Types::FirmsRelated::AddressType], null: false
      field :address, Types::FirmsRelated::AddressType

      field :balance, Types::FirmsRelated::BalanceType, require_manager: true

      field :payments,
            Types::PaymentsRelated::PaymentType.connection_type,
            null: false,
            require_manager: true

      field :payment, Types::PaymentsRelated::PaymentType, null: false, require_manager: true do
        argument :id, ID, required: true, loads: Types::PaymentsRelated::PaymentType
      end

      field :bookings, Types::BookingsRelated::BookingType.connection_type, null: false, require_manager: true do
        argument :filters, Types::Filters::BookingsFilter, required: false
      end

      field :schedules, Types::EventsRelated::ScheduleType.connection_type, null: false, require_manager: true do
        argument :filters, Types::Filters::SchedulesFilter, required: false
      end

      field :schedule, Types::EventsRelated::ScheduleType, null: false, require_manager: true do
        argument :id, ID, required: true, loads: Types::EventsRelated::ScheduleType
      end

      field :events, Types::EventsRelated::EventType.connection_type, null: false do
        argument :filters, Types::Filters::EventsFilter, required: false
        argument :backend, Boolean, required: false
      end

      field :stripe_connects,
            [Types::FirmsRelated::StripeConnectType],
            null: false,
            require_manager: true

      field :margin,
            Integer,
            null: false,
            require_service_user: true

      field :accounts,
            [Types::UsersRelated::AccountType],
            require_manager: true

      field :event, Types::EventsRelated::EventType, require_manager: true do
        argument :id, ID, required: true, loads: Types::EventsRelated::EventType
      end

      field :events_autocomplete, Types::EventsRelated::EventsAutocompleteType, null: false do
        argument :query, String, required: true
        argument :ids, [ID], loads: Types::EventsRelated::EventType, required: false
      end

      field :booking, Types::BookingsRelated::BookingType, require_manager: true do
        argument :id, ID, required: true, loads: Types::BookingsRelated::BookingType
      end

      def events_autocomplete(**args)
        if args[:query].blank?
          return { bookings: [],
                   events: args[:ids],
                   interests: [] }
        end

        { bookings: Booking.search(args[:query], where: { firm_id: object.id }, limit: 5).to_a,
          events: (Event.search(args[:query], where: { firm_id: object.id }, limit: 5).to_a + args[:ids]).uniq,
          interests: Interest.search(args[:query], limit: 5).to_a }
      end

      def payments(**_args)
        arguments = {
          query_type: ::PaymentsQuery,
          firm_id: object.id,
          per_page: 30
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def payment(**args)
        args[:id]
      end

      def events(**args)
        arguments = {
          query_type: ::EventsQuery,
          **(args[:filters] || {}),
          firm_id: object.id,
          per_page: 30,
          backend: args[:backend].nil? ? true : args[:backend]
        }
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def schedules(**args)
        arguments = {
          query_type: ::SchedulesQuery,
          **(args[:filters] || {}),
          firm_id: object.id
        }
        arguments[:event_ids] = args[:filters][:events].map(&:id) if args.dig(:filters, :events)
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def bookings(**args)
        arguments = {
          query_type: ::BookingQuery,
          **(args[:filters] || {}),
          firm_id: object.id
        }
        arguments[:event_ids] = args[:filters][:events].map(&:id) if args.dig(:filters, :events)
        Connections::SearchkickConnection.new(arguments: arguments)
      end

      def image
        return 'some-url-here' if Rails.env.test?
        object.image.url
      end

      def booking(**args)
        args[:id]
      end

      def event(**args)
        args[:id]
      end

      def schedule(**args)
        args[:id]
      end
    end
  end
end
