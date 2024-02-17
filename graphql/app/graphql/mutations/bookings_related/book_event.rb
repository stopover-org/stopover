# frozen_string_literal: true

module Mutations
  module BookingsRelated
    class BookEvent < BaseMutation
      argument :event_id, ID, loads: Types::EventsRelated::EventType
      argument :booked_for, Types::DateTimeType
      argument :attendees_count, Integer, required: false
      argument :places, [[Integer]], required: false

      argument :email, String, required: false
      argument :phone, String, required: false

      field :booking, Types::BookingsRelated::BookingType
      field :access_token, String

      def resolve(event:, **args)
        service = Stopover::BookingManagement::BookingCreator.new(context[:current_user])
        booking = if event.event_placements.count.zero?
                    service.perform(event, args[:booked_for], args[:attendees_count], **args)
                  else
                    service.perform(event, args[:booked_for], args[:attendees_count], places: args[:places])
                  end

        {
          booking: booking,
          access_token: booking.user.access_token,
          notification: I18n.t('graphql.mutations.book_event.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          booking: nil,
          access_token: nil,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        schedules = inputs[:event].schedules.active.where(scheduled_for: inputs[:booked_for])
        potential_attendees_count = inputs[:attendees_count] + Attendee.where(booking_id: schedules.first.booking_ids).count if schedules.any?
        already_booked = current_account ? current_account.bookings.where.not(status: :cancelled).where(schedule_id: schedules.ids).any? : false

        return false, { errors: [I18n.t('graphql.errors.event_past')] } if inputs[:booked_for].past?
        return false, { errors: [I18n.t('graphql.errors.general')] } if schedules.empty?
        return false, { errors: [I18n.t('graphql.errors.already_booked')] } if already_booked
        return false, { errors: [I18n.t('graphql.errors.all_places_reserved')] } if inputs[:event].max_attendees && potential_attendees_count > inputs[:event].max_attendees

        super
      end
    end
  end
end
