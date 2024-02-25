# frozen_string_literal: true

module Fields
  module FirmFields
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

    def title
      if current_firm == object
        object.title
      else
        object.translate(:title)
      end
    end

    def description
      if current_firm == object
        object.description
      else
        object.translate(:description)
      end
    end
  end
end
