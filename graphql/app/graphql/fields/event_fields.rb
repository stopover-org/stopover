# frozen_string_literal: true

module Fields
  module EventFields
    def statistics
      [{ name: :bookings,
         value: object.bookings.count },
       { name: :paid,
         value: object.bookings.where(bookings: { status: :paid }).count }]
    end

    def title
      if current_firm == object.firm
        object.title
      else
        object.translate(:title)
      end
    end

    def description
      if current_firm == object.firm
        object.description
      else
        object.translate(:description)
      end
    end

    def duration_time
      if current_firm == object.firm
        object.duration_time
      else
        object.translate(:duration_time)
      end
    end

    def images
      object.images.map do |img|
        img&.url
      end
    end

    def bookings(**args)
      arguments = {
        query_type: ::BookingQuery,
        **(args[:filters] || {}),
        event_id: object.id
      }
      Connections::SearchkickConnection.new(arguments: arguments)
    end

    def schedules(**args)
      arguments = {
        query_type: ::SchedulesQuery,
        **(args[:filters] || {}),
        event_id: object.id
      }
      Connections::SearchkickConnection.new(arguments: arguments)
    end

    def my_bookings
      return [] unless current_account
      current_account.bookings
                     .where.not(status: :cancelled)
                     .joins(:schedule)
                     .where('schedules.scheduled_for > ? AND bookings.event_id = ?', Time.zone.now, object.id)
                     .where(schedules: { status: :active })
    end

    def event_options
      object.event_options.reorder(created_at: :asc)
    end

    def stripe_integrations
      integrations = object.stripe_integrations.to_a

      object.event_options.each do |opt|
        integrations.concat opt.stripe_integrations
      end

      integrations
    end

    def tour_plan
      object.tour_plans.last
    end
  end
end
