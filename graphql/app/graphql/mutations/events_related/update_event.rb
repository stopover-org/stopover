# frozen_string_literal: true

module Mutations
  module EventsRelated
    class UpdateEvent < BaseMutation
      field :event, Types::EventsRelated::EventType

      argument :event_id, ID, loads: Types::EventsRelated::EventType

      argument :interest_ids, [ID],
               loads: Types::EventsRelated::InterestType,
               required: false
      argument :title, String, required: false
      argument :event_type, Types::EventsRelated::EventTypeEnum, required: false
      argument :description, String, required: false
      argument :recurring_dates, [String], required: false
      argument :single_dates, [String], required: false
      argument :duration_time, String, required: false
      argument :end_date, Types::DateTimeType, required: false

      # Address Fields
      argument :house_number, String, required: false
      argument :street, String, required: false
      argument :city, String, required: false
      argument :country, String, required: false
      argument :region, String, required: false

      argument :full_address, String, required: false
      argument :longitude, Float, required: false
      argument :latitude, Float, required: false

      # Event Options Fields
      argument :event_options,
               [Types::Inputs::UpdateEventOptionInput],
               required: false

      argument :booking_cancellation_options,
               [Types::Inputs::UpdateBookingCancellationOptionInput],
               required: false

      # Check In Options
      argument :requires_contract, Boolean, required: false
      argument :requires_passport, Boolean, required: false
      argument :requires_check_in, Boolean, required: false
      argument :requires_deposit, Boolean, required: false
      argument :max_attendees, Integer, required: false
      argument :min_attendees, Integer, required: false

      argument :organizer_price_per_uom_cents, Integer, required: false
      argument :deposit_amount_cents, Integer, required: false

      argument :images, [String], required: false

      argument :tour_plan,
               Types::Inputs::UpdateTourPlanInput,
               required: false
      argument :language, String, required: false

      def resolve(event:, **args)
        event = Stopover::EventManagement::EventUpdater.new(event).execute(**args)

        {
          event: event,
          notification: I18n.t('graphql.mutations.update_event.notifications.success')
        }
      rescue StandardError => e
        Sentry.capture_exception(e) if Rails.env.production?
        message = Rails.env.development? ? e.message : I18n.t('graphql.errors.general')

        {
          event: nil,
          errors: [message]
        }
      end

      private

      def authorized?(**inputs)
        event = inputs[:event]
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless manager?(event)

        super
      end
    end
  end
end
