# frozen_string_literal: true

module Mutations
  module EventsRelated
    class CreateEvent < BaseMutation
      AUTHORIZATION_FIELD = 'current_firm'

      include Mutations::Authorizations::ManagerAuthorized
      include Mutations::FirmsRelated::Authorizations::FirmAuthorized

      field :event, Types::EventsRelated::EventType

      argument :interest_ids, [ID],
               loads: Types::EventsRelated::InterestType,
               required: false

      argument :title, String, required: true
      argument :event_type, Types::EventsRelated::EventTypeEnum
      argument :description, String
      argument :recurring_dates, [String]
      argument :single_dates, [String]
      argument :duration_time, String
      argument :end_date, Types::DateTimeType, required: false
      argument :language, String, required: false

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
               [Types::Inputs::CreateEventOptionInput],
               required: false

      argument :booking_cancellation_options,
               [Types::Inputs::CreateBookingCancellationOptionInput],
               required: false

      # Check In Options
      argument :requires_contract, Boolean, required: false
      argument :requires_passport, Boolean, required: false
      argument :requires_check_in, Boolean, required: false
      argument :requires_deposit, Boolean, required: false
      argument :max_attendees, Integer, required: false
      argument :min_attendees, Integer, required: false

      argument :organizer_price_per_uom_cents, Integer
      argument :deposit_amount_cents, Integer

      argument :images, [String], required: false

      def resolve(**args)
        event = Stopover::EventManagement::EventCreator.new(context).execute(**args)

        { event: event,
          notification: I18n.t('graphql.mutations.create_event.notifications.success') }
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
        return false, { errors: [I18n.t('graphql.errors.not_authorized')] } unless current_firm

        super
      end
    end
  end
end
